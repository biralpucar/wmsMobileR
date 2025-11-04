using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);
        Task<IEnumerable<User>> GetAllAsync();
        Task<IEnumerable<User>> FindAsync(Expression<Func<User, bool>> predicate);
        Task<User?> GetFirstOrDefaultAsync(Expression<Func<User, bool>> predicate);
        Task<User> AddAsync(User entity);
        Task AddRangeAsync(IEnumerable<User> entities);
        void Update(User entity);
        void Delete(int id);
        Task<bool> ExistsAsync(int id);
        Task<int> CountAsync();
        IQueryable<User> AsQueryable();
    }
}