using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Mappings;
using WMS_WEBAPI.Repositories;
using WMS_WEBAPI.Services;
using WMS_WEBAPI.UnitOfWork;
using WMS_WEBAPI.Middleware;
using WMS_WEBAPI.Hubs;
using System.Security.Claims;
using Hangfire;
using Hangfire.SqlServer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// SignalR Configuration
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
});

// Entity Framework Configuration - Using SQL Server for WMS
builder.Services.AddDbContext<WmsDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=wms.db";
    options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 3,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null);
    });
});

// ERP Database Configuration - Using SQL Server
builder.Services.AddDbContext<ErpDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("ErpConnection");
    options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 3,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null);
    });
});

// AutoMapper Configuration - Automatically discover all mapping profiles in the assembly
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Hangfire Configuration
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection"), new SqlServerStorageOptions
    {
        CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
        SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
        QueuePollInterval = TimeSpan.Zero,
        UseRecommendedIsolationLevel = true,
        DisableGlobalLocks = true
    }));

// Add Hangfire server
builder.Services.AddHangfireServer();

// Register Core Services
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

// Register Authentication & Authorization Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IUserAuthorityService, UserAuthorityService>();

// Register Localization Services
builder.Services.AddScoped<ILocalizationService, LocalizationService>();

// Register ERP Services
builder.Services.AddScoped<IErpService, ErpService>();

// Register Platform Services
builder.Services.AddScoped<IPlatformPageGroupService, PlatformPageGroupService>();
builder.Services.AddScoped<ISidebarmenuHeaderService, SidebarmenuHeaderService>();
builder.Services.AddScoped<ISidebarmenuLineService, SidebarmenuLineService>();
builder.Services.AddScoped<IPlatformUserGroupMatchService, PlatformUserGroupMatchService>();

// Register Mobile Services
builder.Services.AddScoped<IMobilePageGroupService, MobilePageGroupService>();
builder.Services.AddScoped<IMobileUserGroupMatchService, MobileUserGroupMatchService>();
builder.Services.AddScoped<IMobilemenuHeaderService, MobilemenuHeaderService>();
builder.Services.AddScoped<IMobilemenuLineService, MobilemenuLineService>();

// Register Good Receipt Services
builder.Services.AddScoped<IGrHeaderService, GrHeaderService>();
builder.Services.AddScoped<IGrLineService, GrLineService>();
builder.Services.AddScoped<IGrImportDocumentService, GrImportDocumentService>();
builder.Services.AddScoped<IGrImportLService, GrImportLService>();
builder.Services.AddScoped<IGrImportSerialLineService, GrImportSerialLineService>();

// Register Transfer Services
builder.Services.AddScoped<ITrHeaderService, TrHeaderService>();
builder.Services.AddScoped<ITrLineService, TrLineService>();
builder.Services.AddScoped<ITrBoxService, TrBoxService>();
builder.Services.AddScoped<ITrSBoxService, TrSBoxService>();
builder.Services.AddScoped<ITrRouteService, TrRouteService>();
builder.Services.AddScoped<ITrImportLineService, TrImportLineService>();
builder.Services.AddScoped<ITrTerminalLineService, TrTerminalLineService>();

// Register Function Services
builder.Services.AddScoped<IGoodReciptFunctionsService, GoodReciptFunctionsService>();
builder.Services.AddScoped<ITRFunctionService, TRFunctionService>();

// Register Background Job Services
builder.Services.AddScoped<BackgroundJobService>();

// Add HttpContextAccessor for accessing HTTP context in services
builder.Services.AddHttpContextAccessor();

// Localization Configuration
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");



// Request Localization Configuration
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[]
    {
        new CultureInfo("en-US"),
        new CultureInfo("tr-TR")
    };

    options.DefaultRequestCulture = new RequestCulture("tr-TR");
    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;
});

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWebApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000", "http://localhost:8082") // Frontend URL'leri
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // SignalR için gerekli
    });
});

// JWT Authentication Configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "WMS_API",
        ValidAudience = builder.Configuration["Jwt:Audience"] ?? "WMS_Client",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration["Jwt:SecretKey"] ?? "WMS_SECRET_KEY_FOR_JWT_TOKEN_GENERATION_2024")),
        ClockSkew = TimeSpan.Zero
    };
    
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            
            // SignalR Hub için token yakala
            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/authHub"))
            {
                context.Token = accessToken;
            }
            
            return Task.CompletedTask;
        },
        OnTokenValidated = async context =>
        {
            var db = context.HttpContext.RequestServices.GetRequiredService<WmsDbContext>();
            var claims = context.Principal?.Claims;
            var userId = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            
            if (userId == null)
            {
                context.Fail("Token geçersiz: eksik kullanıcı ID");
                return;
            }
            
            // Kullanıcının aktif session'ı var mı kontrol et
            var session = await db.UserSessions
                .FirstOrDefaultAsync(s => s.UserId.ToString() == userId && s.RevokedAt == null);
            
            if (session == null)
            {
                context.Fail("Token geçersiz veya oturum kapandı");
            }
        }
    };
});

// Configure Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "WMS API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

var app = builder.Build();

// Seed data initialization
using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<WmsDbContext>();
        SeedData.Initialize(context);
    }
    catch (Exception ex)
    {
        // Database connection hatası için seed data'yı atla
        Console.WriteLine($"Warning: Could not initialize seed data: {ex.Message}");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "WMS API V1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowWebApp");
app.UseRouting();

// Hangfire Dashboard
app.UseHangfireDashboard("/hangfire", new DashboardOptions
{
    Authorization = new[] { new WMS_WEBAPI.HangfireAuthorizationFilter() }
});

// X-Language header'ını okuyacak custom middleware
app.UseMiddleware<LanguageMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

// Endpoint mapping
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<AuthHub>("/authHub");
});

app.Run();
