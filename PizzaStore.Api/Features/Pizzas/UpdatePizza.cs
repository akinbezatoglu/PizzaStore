using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaStore.Api.Common.Api;
using PizzaStore.Api.Data;

namespace PizzaStore.Api.Features.Pizzas
{
    public class UpdatePizza : IEndpoint
    {
        public static void Map(IEndpointRouteBuilder app) => app
            .MapPut("/", Handle)
            .WithSummary("Updates a pizza");

        public record Request(Guid Id, string Name, string Description);
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.Id).NotEmpty();

                RuleFor(x => x.Name)
                    .NotEmpty()
                    .MaximumLength(250);

                RuleFor(x => x.Description)
                    .NotEmpty()
                    .MaximumLength(750);
            }
        }

        private static async Task<Results<NoContent, NotFound>> Handle(Request request, PizzaStoreDbContext database, CancellationToken cancellationToken)
        {
            var pizza = await database.Pizzas.SingleAsync(x => x.ReferenceId == request.Id, cancellationToken);

            if (pizza == null)
            {
                return TypedResults.NotFound();
            }

            pizza.Name = request.Name;
            pizza.Description = request.Description;
            pizza.UpdatedAtUtc = DateTime.UtcNow;

            await database.SaveChangesAsync(cancellationToken);

            return TypedResults.NoContent();
        }
    }
}
