import { DialogModalContext } from "@/context/DialogModalContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

async function getRevisao(id: string) {
  const revisao = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/revisoes/getRevision?id=${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then((res) => res.json());
  return revisao;
}

const createFileRevisionRequest = async ({ file, usuario, prazo, texto }: any) => {
  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/revisoes/createFileRevisionRequest`,
    {
      method: "POST",
      body: JSON.stringify({ file, usuario, prazo, texto }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
};

const cancelFileRevisionRequest = async (file: any) => {
  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/revisoes/cancelFileRevisionRequest`,
    {
      method: "DELETE",
      body: JSON.stringify(file),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
};

const editFileRevisionRequest = async ({ file, usuario, prazo, texto }: any) => {
  console.log({ file, usuario, prazo, texto });
  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/revisoes/editFileRevisionRequest`,
    {
      method: "PATCH",
      body: JSON.stringify({ file, usuario, prazo, texto }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
};

////////////////////////////////

export const useGetRevisao = (id: string) => {
  return useQuery({
    queryKey: [`revisao-${id}`],
    queryFn: () => getRevisao(id),
    staleTime: Infinity,
    retry: false,
  });
};

export const useCreateFileRevisionRequest = (file) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFileRevisionRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries([`file-${file._id}-metadata`]);
      await queryClient.invalidateQueries([
        `project-${file.metadata.projeto._id}-${file.metadata.disciplina}-files`,
      ]);
    },
  });
};

export const useCancelFileRevisionRequest = (file) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelFileRevisionRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries([`file-${file._id}-metadata`]);
      await queryClient.invalidateQueries([
        `project-${file.metadata.projeto._id}-${file.metadata.disciplina}-files`,
      ]);
    },
  });
};

export const useEditFileRevisionRequest = (file) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editFileRevisionRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries([`file-${file._id}-metadata`]);
      await queryClient.invalidateQueries([
        `project-${file.metadata.projeto._id}-${file.metadata.disciplina}-files`,
      ]);
    },
  });
};
