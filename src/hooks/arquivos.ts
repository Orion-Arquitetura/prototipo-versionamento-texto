import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createFile = async ({ fileData }: { fileData: any }) => {
  try {
    const resposta = await fetch("/api/arquivos/createFile", {
      method: "POST",
      body: fileData,
    }).then((result) => result.json());

    if (resposta.Erro) {
      throw new Error(resposta.Erro);
    }
  } catch (e) {
    window.alert(e);
  }
};

const deleteFile = async ({
  fileID,
  projectID,
}: {
  fileID: string;
  projectID: string;
}) => {
  await fetch(
    `/api/arquivos/deleteFile?fileID=${fileID}&projectID=${projectID}`
  );
};

const getProjectFiles = async (projectID: string) => {
  const files = await fetch(
    `/api/arquivos/getProjectFiles?projectID=${projectID}`
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
    `/api/arquivos/getFilesByDiscipline?projectID=${projectID}&discipline=${discipline}`
  ).then((res) => {
    return res.json();
  });
  return files;
};

const getFileBinaries = async (fileID: string) => {
  const fileUrl = await fetch(`/api/arquivos/getFileBinaries?id=${fileID}`)
    .then((res) => res.blob())
    .then((res) => URL.createObjectURL(res));

  return fileUrl;
};

const getFileMetadata = async (fileID: string) => {
  const file = await fetch(`/api/arquivos/getFileMetadata?id=${fileID}`).then(
    (res) => res.json()
  );
  return file;
};

const addFileReviewRequest = async ({ file, usuario, prazo, texto }: any) => {
  await fetch("/api/arquivos/requestFileReview", {
    method: "POST",
    body: JSON.stringify({ file, usuario, prazo, texto }),
  });
};

const cancelFileReviewRequest = async (file: any) => {
  console.log(file);
  await fetch("/api/arquivos/cancelFileReviewRequest", {
    method: "POST",
    body: JSON.stringify(file),
  });
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
  return useMutation({
    mutationFn: createFile,
    onSuccess: async () => {
      setTimeout(async () => {
        await queryClient.invalidateQueries([
          `project-${projectID}-${discipline}-files`,
        ]);
      }, 2000);
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
      await queryClient.invalidateQueries([
        `project-${projectID}-${discipline}-files`,
      ]);
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

export const useFileReviewRequest = (file) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFileReviewRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries([`file-${file._id}-metadata`]);
      await queryClient.invalidateQueries([
        `project-${file.metadata.projeto.id}-${file.metadata.disciplina}-files`,
      ]);
    },
  });
};

export const useCancelFileReviewRequest = (file) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelFileReviewRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries([`file-${file._id}-metadata`]);
      await queryClient.invalidateQueries([
        `project-${file.metadata.projeto.id}-${file.metadata.disciplina}-files`,
      ]);
    },
  });
};
