async function deployEmptyOvenUsingFactory() {
    // use env files for this?
    const OvenFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    const OvenFactory = await ethers.getContractAt("OvenFactoryContract", OvenFactoryAddress);
    const tx = await OvenFactory.CreateEmptyOven();
    const txData = await tx.wait()
    const OvenAddress = txData.events[0].args.Oven

    console.log("Oven deployed to:", OvenAddress);
    // console.log("Please RUN:")
    // console.log(
    //     "npx hardhat verify --network {network}",
    //     OvenAddress,
    //     OvenFactoryAddress,
    //     "0x0000000000000000000000000000000000000000",
    //     "0x0000000000000000000000000000000000000000"
    // )
  }

deployEmptyOvenUsingFactory()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
