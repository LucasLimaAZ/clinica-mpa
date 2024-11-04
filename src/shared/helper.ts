export const setLocalToken = (token: string) => {
  const authorization = {
    token,
    date: new Date(),
  };
  sessionStorage.setItem("authorization", JSON.stringify(authorization));
};

export const getLocalToken = () => {
  return `Bearer ${
    JSON.parse(sessionStorage.getItem("authorization") as string).token
  }`;
};

export const checkAuthorization = () => {
  const auth = JSON.parse(sessionStorage.getItem("authorization") as string);
  if (!auth) return false;
  const sessionStarted = new Date(auth.date);
  const currntTime = new Date();
  const hours = diffHours(sessionStarted, currntTime);
  return auth.token && hours < 24;
};

export const diffHours = (dt2: Date, dt1: Date) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
};

export const destroySession = () => {
  sessionStorage.removeItem("authorization");
  window.location.reload();
};

export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
