using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using PizzaStore.Api.Common.Api;
using PizzaStore.Api.Data;
using PizzaStore.Api.Data.Models;
using static PizzaStore.Api.Features.Pizzas.CreatePizzas;

namespace PizzaStore.Api.Features.Pizzas
{
    public class CreatePizzas : IEndpoint
    {
        public static void Map(IEndpointRouteBuilder app) => app
            .MapPost("/multiple", Handle)
            .WithSummary("Creates a lot of new pizzas");

        public record PizzaRecord(string Name, string Description);
        public record Request(List<PizzaRecord> Pizzas);
        private static async Task<Ok> Handle(Request request, PizzaStoreDbContext database, CancellationToken cancellationToken)
        {
            List<Pizza> pizzas = request.Pizzas.Select(record => new Pizza
            {
                Name = record.Name,
                Description = record.Description
            }).ToList();

            await database.Pizzas.AddRangeAsync(pizzas, cancellationToken);
            await database.SaveChangesAsync(cancellationToken);

            return TypedResults.Ok();
        }
    }
}
