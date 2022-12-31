import "./../_vendor";

const generatorTimeline = gsap.timeline();

generatorTimeline
  .from(
    ".header",
    {
      opacity: 0,
      y: 30,
      duration: 0.8,
    },
    0.5
  )
  .from(
    ".password-generator",
    {
      opacity: 0,
      x: -15,
      duration: 1,
    },
    1.2
  )
  .from(
    ".password-history",
    {
      opacity: 0,
      x: 15,
      duration: 1.4,
    },
    2.5
  )
  .from(
    ".footer",
    {
      opacity: 0,
      y: -15,
      duration: 1.6,
    },
    3.5
  );

export const animatePreviousPass = (name) => {
  gsap.from(name, {
    opacity: 0,
    y: 10,
  });
};
