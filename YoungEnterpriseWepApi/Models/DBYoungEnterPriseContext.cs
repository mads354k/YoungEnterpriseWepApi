using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace YoungEnterpriseWepApi.Models
{
    public partial class DBYoungEnterPriseContext : DbContext
    {
        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<QuestionInformation> QuestionInformation { get; set; }
        public virtual DbSet<Questionnarie> Questionnarie { get; set; }
        public virtual DbSet<Team> Team { get; set; }
        public virtual DbSet<TeamScore> TeamScore { get; set; }
        public virtual DbSet<TimeShedule> TimeShedule { get; set; }

        public DBYoungEnterPriseContext(DbContextOptions<DBYoungEnterPriseContext> options)
            : base(options)
            { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            optionsBuilder.UseSqlServer(@"Server=MADSLP;Database=DBYoungEnterPrise;uid=sa;pwd=madsterbation3d;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.Property(e => e.UserName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.UserPassword)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("FK__Account__PersonI__24927208");
            });

            modelBuilder.Entity<Person>(entity =>
            {
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
                    .HasConstraintName("FK__Person__TeamName__21B6055D");
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

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuestionInformation)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK__QuestionI__Quest__182C9B23");

                entity.HasOne(d => d.Questionnarie)
                    .WithMany(p => p.QuestionInformation)
                    .HasForeignKey(d => d.QuestionnarieId)
                    .HasConstraintName("FK__QuestionI__Quest__173876EA");
            });

            modelBuilder.Entity<Questionnarie>(entity =>
            {
                entity.Property(e => e.TeamName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.TeamNameNavigation)
                    .WithMany(p => p.Questionnarie)
                    .HasForeignKey(d => d.TeamName)
                    .HasConstraintName("FK__Questionn__TeamN__145C0A3F");
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

            modelBuilder.Entity<TeamScore>(entity =>
            {
                entity.HasKey(e => e.ScoreId);

                entity.Property(e => e.TeamName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.Questionnarie)
                    .WithMany(p => p.TeamScore)
                    .HasForeignKey(d => d.QuestionnarieId)
                    .HasConstraintName("FK__TeamScore__Quest__1BFD2C07");

                entity.HasOne(d => d.TeamNameNavigation)
                    .WithMany(p => p.TeamScore)
                    .HasForeignKey(d => d.TeamName)
                    .HasConstraintName("FK__TeamScore__TeamN__1B0907CE");
            });

            modelBuilder.Entity<TimeShedule>(entity =>
            {
                entity.HasKey(e => e.SheduleId);

                entity.Property(e => e.EventTime)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.JudgeTeam)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.TeamName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.TeamNameNavigation)
                    .WithMany(p => p.TimeShedule)
                    .HasForeignKey(d => d.TeamName)
                    .HasConstraintName("FK__TimeShedu__TeamN__1ED998B2");
            });
        }
    }
}
