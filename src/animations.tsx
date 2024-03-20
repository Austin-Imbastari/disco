export const aboutUsAnimation = {
  hidden: {
    opacity: 0,
    y: -300,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 0,

    transition: {
      duration: 0.5,
    },
  },
};

export const titleAnimation = {
  hidden: {
    x: 300,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: 'easeOut' },
    delay: 0.5,
  },
};

export const fadeDescription = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.75 },
  },
};

export const fadeSvg = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.95 },
  },
};

export const profilePicAnimation = {
  hidden: {
    scale: 1.5,
    opacity: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: { ease: 'easeOut', duration: 1 },
  },
};

export const sliderAnimation = {
  hidden: {
    y: '-10%',
  },
  show: {
    y: '100%',
    transition: { ease: 'easeOut', duration: 1 },
  },
};

export const sliderContainer = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const boardAnimation = {
  hidden: {
    opacity: 0,
    y: 300,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    y: 300,
    transition: {
      duration: 0.5,
    },
  },
};

export const boardItemAnimation = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.9,
    },
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.9,
    },
  },
};

export const itemsBoard = {
  hidden: {
    y: '100%',
  },
  show: {
    y: '0%',
    transition: { duration: 0.5 },
  },
};
