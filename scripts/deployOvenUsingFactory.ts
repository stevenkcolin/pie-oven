async function deployOvenUsingFactory() {
    // use env files for this?
    const OvenFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const Pie = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const Recipe = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    const OvenFactory = await ethers.getContractAt("OvenFactoryContract", OvenFactoryAddress);
    const tx = await OvenFactory.CreateOven(Pie, Recipe);
    const txData = await tx.wait()
    const OvenAddress = txData.events[0].args.Oven

    console.log("Oven deployed to:", OvenAddress);
    // console.log("Please RUN:")
    // console.log(
    //     "npx hardhat verify --network {network}",
    //     OvenAddress,
    //     OvenFactoryAddress,
    //     Pie,
    //     Recipe,
    // )
  }

deployOvenUsingFactory()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
