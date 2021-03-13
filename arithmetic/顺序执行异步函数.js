const test = [
  async () => {
    const v = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("A");
      }, 1000);
    });
    console.log(v);
  },
  async () => {
    const v = await new Promise((resolve) => {
      resolve("B");
    });
    console.log(v);
  },
  async () => {
    const v = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("C");
      }, 0);
    });
    console.log(v);
  },
  async () => {
    const v = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("D");
      }, 500);
    });
    console.log(v);
  },
];

const res = async () => {
  for (let v of test) {
    await v();
  }

  // for (let i = 0; i < test.length; i++) {
  //   await test[i]();
  // }
};

res();
