using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using PizzaStore.Api;
using PizzaStore.Api.Data;
using PizzaStore.Api.Data.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSqlite<PizzaStoreDbContext>(
    builder.Configuration.GetConnectionString("Pizzas") ?? "Data Source=Pizzas.db"
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Pizza Store API", Description = "Making the Pizzas you love", Version = "v1" });
    c.CustomSchemaIds(type => type.FullName?.Replace('+', '.'));
});

string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
      builder =>
      {
          builder.WithOrigins(
            "http://example.com", "*");
      });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Pizza Store API V1");
    });
}

app.MapEndpoints();

app.Run();
