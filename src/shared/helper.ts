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
  // const sessionStarted = new Date(auth.date);
  // const currntTime = new Date();
  // const hours = diffHours(sessionStarted, currntTime);
  return auth.token; // removed && hours < 24 because of server date/time
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
