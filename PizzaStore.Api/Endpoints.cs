using PizzaStore.Api.Common.Api;
using PizzaStore.Api.Common.Filters;
using PizzaStore.Api.Features.Pizzas;

namespace PizzaStore.Api
{
    public static class Endpoints
    {
        public static void MapEndpoints(this WebApplication app)
        {
            var endpoints = app.MapGroup("")
                .AddEndpointFilter<RequestLoggingFilter>();

            endpoints.MapPizzaEndpoints();
        }

        private static void MapPizzaEndpoints(this IEndpointRouteBuilder app)
        {
            var endpoints = app.MapGroup("/pizzas")
                .WithTags("Pizzas");

            endpoints.MapPublicGroup()
                .MapEndpoint<CreatePizza>()
                .MapEndpoint<DeletePizza>()
                .MapEndpoint<GetPizzaById>()
                .MapEndpoint<GetPizzas>()
                .MapEndpoint<UpdatePizza>();
        }

        private static RouteGroupBuilder MapPublicGroup(this IEndpointRouteBuilder app, string prefix = null)
        {
            return app.MapGroup(prefix ?? string.Empty)
                .AllowAnonymous();
        }

        private static IEndpointRouteBuilder MapEndpoint<TEndpoint>(this IEndpointRouteBuilder app) where TEndpoint : IEndpoint
        {
            TEndpoint.Map(app);
            return app;
        }
    }
}
