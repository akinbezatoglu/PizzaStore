using FluentValidation;
using PizzaStore.Api.Common.Api;
using PizzaStore.Api.Common.Request;
using PizzaStore.Api.Data;

namespace PizzaStore.Api.Features.Pizzas
{
    public class GetPizzas : IEndpoint
    {
        public static void Map(IEndpointRouteBuilder app) => app
            .MapGet("/", Handle)
            .WithSummary("Get all pizzas");

        public record Request(int? Page, int? PageSize) : IPagedRequest;
        public class RequestValidator : PagedRequestValidator<Request>
        {
            public RequestValidator() { }
        }
        public record Response(Guid Id, string Name, string Description, DateTime CreatedAtUtc, DateTime? UpdatedAtUtc);

        public static async Task<PagedList<Response>> Handle([AsParameters] Request request, PizzaStoreDbContext database, CancellationToken cancellationToken)
        {
            return await database.Pizzas
                .Select(x => new Response
                (
                    x.ReferenceId,
                    x.Name,
                    x.Description,
                    x.CreatedAtUtc,
                    x.UpdatedAtUtc
                ))
                .ToPagedListAsync(request, cancellationToken);
        }
    }
}
