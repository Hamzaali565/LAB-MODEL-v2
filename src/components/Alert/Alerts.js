import Swal from "sweetalert2";
export const SuccessAlert = ({ text, timer }) => {
  Swal.fire({
    title: "Success!",
    text: text,
    icon: "success",
    timer: timer,
  });
};

export const ErrorAlert = ({ text, timer }) => {
  Swal.fire({
    title: "Oops!",
    text: text,
    icon: "error",
    timer: timer,
    allowOutsideClick: false,
  });
};
