using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace YoungEnterpriseWepApi.Models
{
    public partial class DBYoungEnterPriseContext : DbContext
    {
        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<MigrationHistory> MigrationHistory { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<QuestionInformation> QuestionInformation { get; set; }
        public virtual DbSet<Questionnarie> Questionnarie { get; set; }
        public virtual DbSet<Team> Team { get; set; }

        public DBYoungEnterPriseContext(DbContextOptions<DBYoungEnterPriseContext> options)
    : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasIndex(e => e.PersonId)
                    .HasName("IX_PersonId");

                entity.Property(e => e.UserName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.UserPassword)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("FK_dbo.Account_dbo.Person_PersonId");
            });

            modelBuilder.Entity<MigrationHistory>(entity =>
            {
                entity.HasKey(e => new { e.MigrationId, e.ContextKey });

                entity.ToTable("__MigrationHistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ContextKey).HasMaxLength(300);

                entity.Property(e => e.Model).IsRequired();

                entity.Property(e => e.ProductVersion)
                    .IsRequired()
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasIndex(e => e.TeamName)
                    .HasName("IX_TeamName");

                entity.Property(e => e.EventStatus)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Mail)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.TeamName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.TeamNameNavigation)
                    .WithMany(p => p.Person)
                    .HasForeignKey(d => d.TeamName)
                    .HasConstraintName("FK_dbo.Person_dbo.Team_TeamName");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.TextDescription)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Track)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<QuestionInformation>(entity =>
            {
                entity.HasKey(e => e.InfoId);

                entity.HasIndex(e => e.QuestionId)
                    .HasName("IX_QuestionId");

                entity.HasIndex(e => e.QuestionnarieId)
                    .HasName("IX_QuestionnarieId");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuestionInformation)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK_dbo.QuestionInformation_dbo.Question_QuestionId");

                entity.HasOne(d => d.Questionnarie)
                    .WithMany(p => p.QuestionInformation)
                    .HasForeignKey(d => d.QuestionnarieId)
                    .HasConstraintName("FK_dbo.QuestionInformation_dbo.Questionnarie_QuestionnarieId");
            });

            modelBuilder.Entity<Questionnarie>(entity =>
            {
                entity.HasIndex(e => e.TeamName)
                    .HasName("IX_TeamName");

                entity.Property(e => e.TeamName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.TeamNameNavigation)
                    .WithMany(p => p.Questionnarie)
                    .HasForeignKey(d => d.TeamName)
                    .HasConstraintName("FK_dbo.Questionnarie_dbo.Team_TeamName");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.HasKey(e => e.TeamName);

                entity.Property(e => e.TeamName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.School)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Track)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });
        }
    }
}
