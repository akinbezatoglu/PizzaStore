using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaStore.Api.Common.Api;
using PizzaStore.Api.Data;

namespace PizzaStore.Api.Features.Pizzas
{
    public class GetPizzaById : IEndpoint
    {
        public static void Map(IEndpointRouteBuilder app) => app
            .MapGet("/{id}", Handle)
            .WithSummary("Gets a pizza by id");

        public record Request(Guid Id);
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
            }
        }
        public record Response(Guid Id, string Name, string Description, DateTime CreatedAtUtc, DateTime? UpdatedAtUtc);

        private static async Task<Results<Ok<Response>, NotFound>> Handle([AsParameters] Request request, PizzaStoreDbContext database, CancellationToken cancellationToken)
        {
            var pizza = await database.Pizzas
                .Where(x => x.ReferenceId == request.Id)
                .Select(x => new Response
                (
                    x.ReferenceId,
                    x.Name,
                    x.Description,
                    x.CreatedAtUtc,
                    x.UpdatedAtUtc
                ))
                .SingleOrDefaultAsync(cancellationToken);

            return pizza is null
                ? TypedResults.NotFound()
                : TypedResults.Ok(pizza);
        }
    }
}
