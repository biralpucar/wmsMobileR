using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        protected readonly WmsDbContext _context;
        protected readonly DbSet<User> _dbSet;

        public UserRepository(WmsDbContext context)
        {
            _context = context;
            _dbSet = context.Set<User>();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _dbSet.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<IEnumerable<User>> FindAsync(Expression<Func<User, bool>> expression)
        {
            return await _dbSet.Where(expression).ToListAsync();
        }

        public async Task<User?> GetFirstOrDefaultAsync(Expression<Func<User, bool>> expression)
        {
            return await _dbSet.Where(expression).FirstOrDefaultAsync();
        }

        public async Task<User> AddAsync(User entity)
        {
            entity.CreatedDate = DateTime.UtcNow;
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public async Task AddRangeAsync(IEnumerable<User> entities)
        {
            foreach (var entity in entities)
            {
                entity.CreatedDate = DateTime.UtcNow;
            }
            await _dbSet.AddRangeAsync(entities);
        }

        public void Update(User entity)
        {
            entity.UpdatedDate = DateTime.UtcNow;
            _dbSet.Update(entity);
        }

        public void Delete(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _dbSet.AnyAsync(e => e.Id == id);
        }

        public async Task<int> CountAsync()
        {
            return await _dbSet.CountAsync();
        }

        public IQueryable<User> AsQueryable()
        {
            return _dbSet;
        }
    }
}