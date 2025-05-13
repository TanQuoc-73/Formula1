"use client";

import React from "react";
import { useTeams } from "@/hooks/useTeams";
import { useTeamForm } from "@/hooks/useTeamForm";
import { AddTeamForm } from "@/components/AddTeamForm";
import { UpdateTeamForm } from "@/components/UpdateTeamForm";
import { TeamsTable } from "@/components/TeamsTable";
// Shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AdminTeamsPage() {
  const { teams, loading, error, refreshTeams } = useTeams();
  const {
    editingTeam,
    newTeamData,
    addingTeam,
    newTeam,
    updateError,
    addError,
    // predictError,
    prediction,
    setAddingTeam,
    handleEditClick,
    handleDeleteClick,
    handleInputChange,
    handleUpdateSubmit,
    handleAddSubmit,
    predictTeamOutcome,
  } = useTeamForm(refreshTeams);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quản lý Đội</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setAddingTeam(true)}
            className="mb-6 bg-green-600 hover:bg-green-700"
          >
            Thêm Đội Mới
          </Button>

          {addingTeam && (
            <AddTeamForm
              newTeam={newTeam}
              onInputChange={handleInputChange}
              onSubmit={handleAddSubmit}
              onCancel={() => setAddingTeam(false)}
              error={addError}
            />
          )}

          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {teams && teams.length > 0 ? (
            <TeamsTable
              teams={teams}
              prediction={prediction}
              // predictError={predictError}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              onPredictClick={predictTeamOutcome}
            />
          ) : (
            !loading && (
              <p className="text-center text-gray-500">Không tìm thấy đội nào.</p>
            )
          )}

          {editingTeam && newTeamData && (
            <UpdateTeamForm
              team={newTeamData}
              onInputChange={handleInputChange}
              onSubmit={handleUpdateSubmit}
              onCancel={() => setEditingTeam(null)}
              error={updateError}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}