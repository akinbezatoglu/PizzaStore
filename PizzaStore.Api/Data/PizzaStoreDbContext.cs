using Microsoft.EntityFrameworkCore;
using PizzaStore.Api.Data.Models;

namespace PizzaStore.Api.Data
{
    public class PizzaStoreDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Pizza> Pizzas { get; set; } = null;
    }
}
