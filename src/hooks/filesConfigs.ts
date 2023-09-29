import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getDisciplines = async () => {
  const disciplinas = await fetch("https://orion-code-backend.onrender.com/filesProps/getDisciplines").then((res) =>
    res.json()
  );
  return disciplinas;
};

const getEtapasDoProjeto = async () => {
  const disciplinas = await fetch("https://orion-code-backend.onrender.com/filesProps/getEtapasDoProjeto").then(
    (res) => res.json()
  );
  return disciplinas;
};

const getTiposDeDocumento = async () => {
  const disciplinas = await fetch("https://orion-code-backend.onrender.com/filesProps/getTiposDeDocumento").then(
    (res) => res.json()
  );
  return disciplinas;
};

const createDiscipline = async (data: { nome: string; sigla: string }) => {
  await fetch("https://orion-code-backend.onrender.com/filesProps/createDiscipline", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const response = await res.json();
    console.log(response);
    if (response.Erro) {
      window.alert(response.Erro);
      return;
    }

    window.alert(response.Success);
  });
};

const createEtapaDoProjeto = async (data: { nome: string; sigla: string }) => {
  await fetch("https://orion-code-backend.onrender.com/filesProps/createEtapaDoProjeto", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const response = await res.json();
    console.log(response);
    if (response.Erro) {
      window.alert(response.Erro);
      return;
    }

    window.alert(response.Success);
  });
};

const createTipoDeDocumento = async (data: { nome: string; sigla: string }) => {
  await fetch("https://orion-code-backend.onrender.com/filesProps/createTipoDeDocumento", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const response = await res.json();
    console.log(response);
    if (response.Erro) {
      window.alert(response.Erro);
      return;
    }

    window.alert(response.Success);
  });
};

const deleteDiscipline = async (id: string) => {
  await fetch(`https://orion-code-backend.onrender.com/filesProps/deleteDiscipline?id=${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

const deleteEtapaDoProjeto = async (id: string) => {
  await fetch(`https://orion-code-backend.onrender.com/filesProps/deleteEtapaDoProjeto?id=${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

const deleteTipoDeDocumento = async (id: string) => {
  await fetch(`https://orion-code-backend.onrender.com/filesProps/deleteTipoDeDocumento?id=${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

const updateDiscipline = async (data: { nome: string; sigla: string; id: string }) => {
  await fetch(`https://orion-code-backend.onrender.com/filesProps/updateDiscipline`, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const response = await res.json();
    if (response.Erro) {
      window.alert("Erro: operação não foi concluída.");
      return;
    }
  });
};

const updateEtapaDoProjeto = async (data: { nome: string; sigla: string; id: string }) => {
  await fetch(`https://orion-code-backend.onrender.com/filesProps/updateEtapaDoProjeto`, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const response = await res.json();
    if (response.Erro) {
      window.alert("Erro: operação não foi concluída.");
      return;
    }
  });
};

const updateTipoDeDocumento = async (data: { nome: string; sigla: string; id: string }) => {
  await fetch(`https://orion-code-backend.onrender.com/filesProps/updateTipoDeDocumento`, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const response = await res.json();
    console.log(response);
    if (response.Erro) {
      window.alert("Erro: operação não foi concluída.");
      return;
    }
  });
};

//////////////////// CUSTOM HOOKS AREA /////////////////////////

export const useGetDisciplines = () => {
  return useQuery({
    queryKey: ["disciplines"],
    queryFn: getDisciplines,
    staleTime: Infinity,
  });
};

export const useGetEtapasDoProjeto = () => {
  return useQuery({
    queryKey: ["etapas-de-projeto"],
    queryFn: getEtapasDoProjeto,
    staleTime: Infinity,
  });
};

export const useGetTiposDeDocumento = () => {
  return useQuery({
    queryKey: ["tipos-de-documento"],
    queryFn: getTiposDeDocumento,
    staleTime: Infinity,
  });
};

export const useCreateDiscipline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDiscipline,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["disciplines"]);
    },
  });
};

export const useCreateEtapaDoProjeto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEtapaDoProjeto,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["etapas-de-projeto"]);
    },
  });
};

export const useCreateTipoDeDocumento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTipoDeDocumento,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["tipos-de-documento"]);
    },
  });
};

export const useDeleteDiscipline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDiscipline,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["disciplines"]);
    },
  });
};

export const useDeleteEtapaDoProjeto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEtapaDoProjeto,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["etapas-de-projeto"]);
    },
  });
};

export const useDeleteTipoDeDocumento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTipoDeDocumento,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["tipos-de-documento"]);
    },
  });
};

export const useUpdateDiscipline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDiscipline,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["disciplines"]);
    },
  });
};

export const useUpdateEtapaDoProjeto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEtapaDoProjeto,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["etapas-de-projeto"]);
    },
  });
};

export const useUpdateTipoDeDocumento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTipoDeDocumento,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["tipos-de-documento"]);
    },
  });
};
