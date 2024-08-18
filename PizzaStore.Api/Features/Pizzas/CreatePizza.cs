using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using PizzaStore.Api.Common.Api;
using PizzaStore.Api.Data;
using PizzaStore.Api.Data.Models;

namespace PizzaStore.Api.Features.Pizzas
{
    public class CreatePizza : IEndpoint
    {
        public static void Map(IEndpointRouteBuilder app) => app
            .MapPost("/", Handle)
            .WithSummary("Creates a new pizza");

        public record Request(string Name, string Description);
        public record Response(Guid Id);
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .MaximumLength(250);

                RuleFor(x => x.Description)
                    .NotEmpty()
                    .MaximumLength(750);
            }
        }

        private static async Task<Ok<Response>> Handle(Request request, PizzaStoreDbContext database, CancellationToken cancellationToken)
        {
            var pizza = new Pizza
            {
                Name = request.Name,
                Description = request.Description,
            };

            await database.Pizzas.AddAsync(pizza, cancellationToken);
            await database.SaveChangesAsync(cancellationToken);

            var response = new Response(pizza.ReferenceId);
            return TypedResults.Ok(response);
        }
    }
}
