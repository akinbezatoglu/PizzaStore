using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaStore.Api.Common.Api;
using PizzaStore.Api.Data;

namespace PizzaStore.Api.Features.Pizzas
{
    public class DeletePizza : IEndpoint
    {
        public static void Map(IEndpointRouteBuilder app) => app
            .MapDelete("/{id}", Handle)
            .WithSummary("Deletes a pizza by id");

        public record Request(Guid Id);
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
            }
        }

        private static async Task<Results<NoContent, NotFound>> Handle([AsParameters] Request request, PizzaStoreDbContext database, CancellationToken cancellationToken)
        {
            var rowsDeleted = await database.Pizzas
                .Where(x => x.ReferenceId == request.Id)
                .ExecuteDeleteAsync(cancellationToken);

            return rowsDeleted == 1
                ? TypedResults.NoContent()
                : TypedResults.NotFound();
        }
    }
}
