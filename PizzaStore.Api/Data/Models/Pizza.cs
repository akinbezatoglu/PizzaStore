namespace PizzaStore.Api.Data.Models
{
    public class Pizza
    {
        public int Id { get; private init; }
        public Guid ReferenceId { get; private init; } = Guid.NewGuid();
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAtUtc { get; private init; } = DateTime.UtcNow;
        public DateTime? UpdatedAtUtc { get; set; }
    }
}
