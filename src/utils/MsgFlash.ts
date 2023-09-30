import { toast } from "react-toastify";
export function ErrorRequest(mensagem: string) {
  toast.error(mensagem, {
    position: toast.POSITION.TOP_CENTER,
  });
  return;
}

export function SucessRequest(mensagem: string) {
  toast.success(mensagem, {
    position: toast.POSITION.TOP_RIGHT,
  });
}

export function getDateLog() {
  let today = `${new Date().toLocaleDateString(
    "pt-BR"
  )} - ${new Date().toLocaleTimeString("pt-BR")} `;
  return today;
}
