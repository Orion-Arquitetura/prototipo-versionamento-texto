import { DialogModalContext } from "@/context/DialogModalContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

const createFile = async ({ fileData }: { fileData: any }) => {
  try {
    const resposta = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000"
          : "https://orion-code-backend.onrender.com"
      }/arquivos/createFile`,
      {
        method: "POST",
        body: fileData,
        credentials: "include",
      }
    ).then((result) => result.json());

    if (resposta.Erro) {
      throw new Error(resposta.Erro);
    }
  } catch (e) {
    throw e;
  }
};

const createMultipleFiles = async ({ fileData }: { fileData: any }) => {
  try {
    const resposta = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000"
          : "https://orion-code-backend.onrender.com"
      }/arquivos/createMultipleFiles`,
      {
        method: "POST",
        body: fileData,
        credentials: "include",
      }
    ).then((result) => result.json());

    if (resposta.error) {
      throw Error(resposta.message);
    }
  } catch (e) {
    throw e;
  }
};

const deleteFile = async ({ fileID, projectID }: { fileID: string; projectID: string }) => {
  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/arquivos/deleteFile`,
    {
      body: JSON.stringify({ projectID, fileID }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      credentials: "include",
    }
  );
};

const getProjectFiles = async (projectID: string) => {
  const files = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/arquivos/getProjectFiles?projectID=${projectID}`,
    { credentials: "include" }
  ).then((res) => res.json());
  return files;
};

const getFilesByDiscipline = async ({
  projectID,
  discipline,
}: {
  projectID: string;
  discipline: string;
}) => {
  const files = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/arquivos/getFilesByDiscipline?projectID=${projectID}&discipline=${discipline}`,
    {
      credentials: "include",
    }
  ).then((res) => {
    return res.json();
  });
  return files;
};

const getFileBinaries = async (fileID: string) => {
  const fileUrl = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/arquivos/getFileBinaries?id=${fileID}`,
    {
      credentials: "include",
    }
  )
    .then((res) => res.blob())
    .then((res) => URL.createObjectURL(res));

  return fileUrl;
};

const getFileMetadata = async (fileID: string) => {
  const file = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/arquivos/getFileMetadata?id=${fileID}`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
  return file;
};

const createNewFileFromRevision = async ({ fileData }: any) => {
  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/arquivos/createNewFileFromReviewRequest`,
    {
      method: "POST",
      body: fileData,
      credentials: "include",
    }
  );
};

//////////////////CUSTOM HOOKS AREA///////////////////

export const useCreateFile = ({
  projectID,
  discipline,
}: {
  projectID: string;
  discipline: string;
}) => {
  const queryClient = useQueryClient();
  const { open } = useContext(DialogModalContext);

  return useMutation({
    mutationFn: createFile,
    onSuccess: async () => {
      setTimeout(async () => {
        console.log(projectID, discipline);
        await queryClient.invalidateQueries([`project-${projectID}-${discipline}-files`]);
      }, 3000);
    },
    onError: (error) => {
      open(error.toString());
    },
  });
};

export const useCreateMultipleFiles = (projectID: string) => {
  const queryClient = useQueryClient();
  const { open } = useContext(DialogModalContext);

  return useMutation({
    mutationFn: createMultipleFiles,
    onSuccess: async () => {
      setTimeout(async () => {
        // await queryClient.invalidateQueries([`project-${projectID}-${discipline}-files`]);
      }, 3000);
    },
    onError: (error: any) => {
      open(`${error.message} Nenhum arquivo dos enviados foi salvo no banco de dados.`);
    },
  });
};

export const useDeleteFile = ({
  projectID,
  discipline,
}: {
  projectID: string;
  discipline: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: async () => {
      await queryClient.invalidateQueries([`project-${projectID}-${discipline}-files`]);
    },
  });
};

export const useGetProjectFiles = (projectID: string) => {
  return useQuery({
    queryKey: ["project-files"],
    queryFn: () => getProjectFiles(projectID),
    refetchOnWindowFocus: false,
  });
};

export const useGetFilesByDiscipline = ({
  projectID,
  discipline,
}: {
  projectID: string;
  discipline: string;
}) => {
  return useQuery({
    queryKey: [`project-${projectID}-${discipline}-files`],
    queryFn: () =>
      getFilesByDiscipline({
        projectID,
        discipline,
      }),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetFileBinaries = (fileID: string) => {
  return useQuery({
    queryKey: [`file-${fileID}-binaries`],
    queryFn: () => getFileBinaries(fileID),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useGetFileMetadata = (fileID: string) => {
  return useQuery({
    queryKey: [`file-${fileID}-metadata`],
    queryFn: () => getFileMetadata(fileID),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useSendReviewedFile = (file) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewFileFromRevision,
    onSuccess: async () => {
      await queryClient.invalidateQueries([`file-${file._id}-metadata`]);
      await queryClient.invalidateQueries([
        `project-${file.metadata.projeto._id}-${file.metadata.disciplina}-files`,
      ]);
    },
  });
};
