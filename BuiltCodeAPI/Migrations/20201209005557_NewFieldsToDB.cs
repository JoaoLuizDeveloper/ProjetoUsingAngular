using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BuiltCodeAPI.Migrations
{
    public partial class NewFieldsToDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Patients_PatientId",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_PatientId",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Doctors");

            migrationBuilder.AddColumn<Guid>(
                name: "DoctorId",
                table: "Patients",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CRMEnd",
                table: "Doctors",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_DoctorId",
                table: "Patients",
                column: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Doctors_DoctorId",
                table: "Patients",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Doctors_DoctorId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_DoctorId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "DoctorId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "CRMEnd",
                table: "Doctors");

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Patients",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PatientId",
                table: "Doctors",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_PatientId",
                table: "Doctors",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Patients_PatientId",
                table: "Doctors",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
