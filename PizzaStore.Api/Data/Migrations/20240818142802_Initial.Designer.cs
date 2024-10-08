﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PizzaStore.Api.Data;

#nullable disable

namespace PizzaStore.Api.Data.Migrations
{
    [DbContext(typeof(PizzaStoreDbContext))]
    [Migration("20240818142802_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.0");

            modelBuilder.Entity("PizzaStore.Api.Data.Models.Pizza", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedAtUtc")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ReferenceId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAtUtc")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Pizzas");
                });
#pragma warning restore 612, 618
        }
    }
}
