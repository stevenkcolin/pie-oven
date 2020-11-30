const { ethers } = require("hardhat");
const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");

describe("Oven happy flow", function () {
  let pool : any;
  let recipe : any;
  let owner : any;
  let oven : any;

  before(async function () {
    [owner] = await ethers.getSigners();
    const TestPieRecipe = await ethers.getContractFactory(
      "TestPieRecipe"
    );
    recipe = await TestPieRecipe.deploy();
    await recipe.deployed();

    const recipeAddress = recipe.address;
    console.log(`Recipe deployed at: ${recipeAddress}`);


    const TestPie = await ethers.getContractFactory(
      "TestPie"
    );
    pool = await TestPie.deploy(parseEther("10000000000"), recipe.address);
    await pool.deployed();

    const poolAddress = pool.address;
    console.log(`Pool deployed at: ${poolAddress}`);
  });

//   it("Should deploy oven", async function () {
//     const Oven = await ethers.getContractFactory("Oven");
//     oven = await Oven.deploy(owner.getAddress(), pool.address, recipe.address);
//     await oven.deployed();

//     console.log(`Oven deployed at: ${oven.address}`);

//     expect(await oven.getCap()).to.be.eq(0);
//     await oven.setCap(parseEther("100"))
//     expect(await oven.getCap()).to.be.eq(parseEther("100"));
//   });
//   it("Deposit", async function () {
//     await expect(await oven.ethBalanceOf(owner.getAddress())).to.be.eq(0);

//     await owner.sendTransaction({
//       to: oven.address,
//       value:parseEther("1.0")
//     });
//     await oven.deposit({ value: parseEther("1") });

//     await expect(await oven.ethBalanceOf(owner.getAddress())).to.be.eq(parseEther("2"));
//   });
//   it("Withdraw ETH", async function () {
//     await oven.withdrawETH(parseEther("1"), owner.getAddress())
//     await expect(await oven.ethBalanceOf(owner.getAddress())).to.be.eq(parseEther("1"));

//  });
//   it("Starts exchanging", async function () {
//     await recipe.testSetCalcToPieAmount(parseEther("1"))

//     const ethBalanceOfBefore = await oven.ethBalanceOf(owner.getAddress());
//     console.log(`ethBalanceOfBefore is: ${ethBalanceOfBefore}`);
//     const outputBalanceOfBefore = await oven.outputBalanceOf(owner.getAddress());
//     console.log(`outputBalanceOfBefore is: ${outputBalanceOfBefore}`);

//     // await expect(await oven.ethBalanceOf(owner.getAddress())).to.be.eq(parseEther("1"));
//     // await expect(await oven.outputBalanceOf(owner.getAddress())).to.be.eq(parseEther("0"));

//     // await oven.bake([owner.getAddress()], parseEther("1"), parseEther("2"));
//     await oven.bake([owner.getAddress()], parseEther("6.9"), parseEther("10"));

//     // await expect(await oven.ethBalanceOf(owner.getAddress())).to.be.eq(parseEther("0"));
//     // await expect(await oven.outputBalanceOf(owner.getAddress())).to.be.eq(parseEther("1"));


//     const ethBalanceOfAfter = await oven.ethBalanceOf(owner.getAddress());
//     console.log(`ethBalanceOfAfter is: ${ethBalanceOfAfter}`);

//     const outputBalanceOfAfter = await oven.outputBalanceOf(owner.getAddress());
//     console.log(`outputBalanceOfAfter is: ${outputBalanceOfAfter}`);

//  });
  // it("Withdraw Output", async function () {

  //   await expect(await oven.outputBalanceOf(owner.getAddress())).to.be.eq(parseEther("1"));
  //   await expect(await pool.balanceOf(owner.getAddress())).to.be.eq(parseEther("0"))

  //   await oven.withdrawOutput(owner.getAddress())
    
  //   await expect(await oven.outputBalanceOf(owner.getAddress())).to.be.eq(parseEther("0"));
  //   await expect(await pool.balanceOf(owner.getAddress())).to.be.eq(parseEther("1"))
  // });
});

describe("Test Deployment flow", function () {
  let pool : any;
  let recipe : any;
  let owner : any;
  let user1 : any;
  let user2 : any;
  let user3 : any;
  let oven : any;
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

  // it("Regular deployment", async function () {
  //   [owner, user1, user2, user3] = await ethers.getSigners();
  //   const TestPieRecipe = await ethers.getContractFactory(
  //     "TestPieRecipe"
  //   );
  //   recipe = await TestPieRecipe.deploy();
  //   await recipe.deployed();

  //   const recipeAddress = recipe.address;
  //   console.log(`recipeAddress ${recipeAddress}`);

  //   const TestPie = await ethers.getContractFactory(
  //     "TestPie"
  //   );
  //   pool = await TestPie.deploy(parseEther("10000000000"), recipe.address);
  //   await pool.deployed();

  //   const poolAddress = pool.address;
  //   console.log(`poolAddress ${poolAddress}`);

  //   const Oven = await ethers.getContractFactory("Oven");
  //   oven = await Oven.deploy(owner.getAddress(), pool.address, recipe.address);
  //   await oven.deployed();
  //   await oven.setCap(parseEther("1000"));

  //   const ovenAddress = oven.address;
  //   console.log(`ovenAddress ${ovenAddress}`);

  //   await expect(await oven.pie()).to.be.eq(pool.address)
  //   await oven.bake([], 1, 1)
  //   await owner.sendTransaction({
  //     to: oven.address,
  //     value:parseEther("1.0")
  //   });
  //   await oven.deposit({ value: parseEther("1") });
  //   await oven.withdrawAll(owner.getAddress())
  //   await oven.withdrawAllETH(owner.getAddress())
  //   await oven.withdrawETH(parseEther("0"), owner.getAddress())
  //   await oven.withdrawOutput(owner.getAddress())
  // })
//   it("Set pie failing", async function () {
//     await expect(oven.setPie(pool.address)).to.be.revertedWith("PIE_ALREADY_SET")
//   })
  describe("No initial pool deployment", function () {
    // it("Deploy pool with zero pool addres", async function () {
    //   [owner, user1, user2, user3] = await ethers.getSigners();
    //   const TestPieRecipe = await ethers.getContractFactory(
    //     "TestPieRecipe"
    //   );
    //   recipe = await TestPieRecipe.deploy();
    //   await recipe.deployed();
    //   console.log("recipeBefore is: ",recipe.address);

    //   const Oven = await ethers.getContractFactory("Oven");
    //   oven = await Oven.deploy(owner.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS);
    //   await oven.deployed();
    //   await oven.setCap(parseEther("1000"));

    //   await expect(await oven.pie()).to.be.eq(ZERO_ADDRESS)
    //   await expect(oven.bake([], 1, 1)).to.be.revertedWith("PIE_NOT_SET")
    //   await expect(owner.sendTransaction({
    //     to: oven.address,
    //     value:parseEther("1.0")
    //   })).to.be.revertedWith("PIE_NOT_SET")
    //   await expect(oven.deposit({ value: parseEther("1") })).to.be.revertedWith("PIE_NOT_SET")
    //   await expect(oven.withdrawAll(owner.getAddress())).to.be.revertedWith("PIE_NOT_SET")
    //   await expect(oven.withdrawAllETH(owner.getAddress())).to.be.revertedWith("PIE_NOT_SET")
    //   await expect(oven.withdrawETH(parseEther("0"), owner.getAddress())).to.be.revertedWith("PIE_NOT_SET")
    //   await expect(oven.withdrawOutput(owner.getAddress())).to.be.revertedWith("PIE_NOT_SET")
    // })
    // it("Deploy pool with zero recipe addres", async function () {
    //   [owner, user1, user2, user3] = await ethers.getSigners();
    //   const TestPieRecipe = await ethers.getContractFactory(
    //     "TestPieRecipe"
    //   );
    //   recipe = await TestPieRecipe.deploy();
    //   await recipe.deployed();

    //   const Oven = await ethers.getContractFactory("Oven");
    //   oven = await Oven.deploy(owner.getAddress(), pool.address, ZERO_ADDRESS);
    //   console.log("------------------");
    //   console.log("poolAddress is: ",pool.address);
    //   await oven.deployed();
    //   await oven.setCap(parseEther("1000"));

    //   await expect(await oven.pie()).to.be.eq(pool.address)
    //   await expect(oven.bake([], 1, 1)).to.be.revertedWith("RECIPE_NOT_SET")
    //   await expect(owner.sendTransaction({
    //     to: oven.address,
    //     value:parseEther("1.0")
    //   })).to.be.revertedWith("RECIPE_NOT_SET")
    //   await expect(oven.deposit({ value: parseEther("1") })).to.be.revertedWith("RECIPE_NOT_SET")
    //   await expect(oven.withdrawAll(owner.getAddress())).to.be.revertedWith("RECIPE_NOT_SET")
    //   await expect(oven.withdrawAllETH(owner.getAddress())).to.be.revertedWith("RECIPE_NOT_SET")
    //   await expect(oven.withdrawETH(parseEther("0"), owner.getAddress())).to.be.revertedWith("RECIPE_NOT_SET")
    //   await expect(oven.withdrawOutput(owner.getAddress())).to.be.revertedWith("RECIPE_NOT_SET")
    // })
    // it("Deploy pool with zero addresses", async function () {
    //   [owner, user1, user2, user3] = await ethers.getSigners();
    //   const TestPieRecipe = await ethers.getContractFactory(
    //     "TestPieRecipe"
    //   );
    //   recipe = await TestPieRecipe.deploy();
    //   await recipe.deployed();

    //   const Oven = await ethers.getContractFactory("Oven");
    //   oven = await Oven.deploy(owner.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS);




    //   await oven.deployed();
    //   await oven.setCap(parseEther("1000"));
    //   await expect(oven.withdrawOutput(owner.getAddress())).to.be.revertedWith("PIE_NOT_SET")
    // })
    // it("Set pie and recipe", async function () {
    //   const TestPie = await ethers.getContractFactory(
    //   "TestPie"
    //   );
    //   pool = await TestPie.deploy(parseEther("10000000000"), recipe.address);
    //   await pool.deployed();
    //   await oven.setPie(pool.address);
    //   await oven.setRecipe(recipe.address);
    //   await expect(await oven.pie()).to.be.eq(pool.address)
    //   await expect(await oven.recipe()).to.be.eq(recipe.address)
    //   await oven.bake([], 1, 1)
    //   await owner.sendTransaction({
    //     to: oven.address,
    //     value:parseEther("1.0")
    //   });
    //   await oven.deposit({ value: parseEther("1") });
    //   await oven.withdrawAll(owner.getAddress())
    //   await oven.withdrawAllETH(owner.getAddress())
    //   await oven.withdrawETH(parseEther("0"), owner.getAddress())
    //   await oven.withdrawOutput(owner.getAddress())
    // })
    // it("Set pie failing", async function () {
    //   await expect(oven.setPie(pool.address)).to.be.revertedWith("PIE_ALREADY_SET")
    // })
//     it("Set recipe failing", async function () {
//       await expect(oven.setRecipe(pool.address)).to.be.revertedWith("RECIPE_ALREADY_SET")
//     })
//     it("Set pie + recipe failing", async function () {
//       await expect(oven.setPieAndRecipe(pool.address, recipe.address)).to.be.revertedWith("PIE_ALREADY_SET")
//     })
    // it("Set pie and recipe, in one tx", async function () {
    //   const Oven = await ethers.getContractFactory("Oven");

    //   oven = await Oven.deploy(owner.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS);

    //   await oven.deployed();

    //   await oven.setPieAndRecipe(pool.address, recipe.address)

    //   await expect(await oven.pie()).to.be.eq(pool.address)
    //   await expect(await oven.recipe()).to.be.eq(recipe.address)
    //   const ovenPieAddress = await oven.pie();
    //   console.log(`ovenPieAddress: ${ovenPieAddress}`);
      
    //   const ovenRecipeAddress = await oven.recipe();
    //   console.log(`ovenRecipeAddress is: ${ovenRecipeAddress}`);
    // })
//     it("verify controller functions", async function () {
//       await expect(oven.connect(user1).setPieAndRecipe(ZERO_ADDRESS, ZERO_ADDRESS)).to.be.revertedWith("NOT_CONTROLLER")
//       await expect(oven.connect(user1).setPie(ZERO_ADDRESS)).to.be.revertedWith("NOT_CONTROLLER")
//       await expect(oven.connect(user1).setRecipe(ZERO_ADDRESS)).to.be.revertedWith("NOT_CONTROLLER")
//       await expect(oven.connect(user1).setController(ZERO_ADDRESS)).to.be.revertedWith("NOT_CONTROLLER")
//       await expect(oven.connect(user1).setCap(ZERO_ADDRESS)).to.be.revertedWith("NOT_CONTROLLER")
//     })
  })
});

describe("Test baking", function () {
  let pool : any;
  let recipe : any;
  let owner : any;
  let user1 : any;
  let user2 : any;
  let user3 : any;
  let oven : any;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();
    const TestPieRecipe = await ethers.getContractFactory(
      "TestPieRecipe"
    );
    recipe = await TestPieRecipe.deploy();
    await recipe.deployed();
    console.log(`recipe is: ${recipe.address}`);

    const TestPie = await ethers.getContractFactory(
      "TestPie"
    );
    pool = await TestPie.deploy(parseEther("10000000000"), recipe.address);
    await pool.deployed();
    console.log(`pool is: ${pool.address}`);

    const Oven = await ethers.getContractFactory("Oven");
    oven = await Oven.deploy(owner.getAddress(), pool.address, recipe.address);
    await oven.deployed();
    console.log(`oven is: ${oven.address}`);

    await oven.setCap(parseEther("1000"));
    await oven.connect(user1).deposit({ value: parseEther("100") })
    await oven.connect(user2).deposit({ value: parseEther("100") })
    await oven.connect(user3).deposit({ value: parseEther("100") })
  });

  // it("Non controller", async function () {
  //     await expect (
  //       oven.connect(user1).bake([owner.getAddress()], parseEther("1"), parseEther("2"))
  //     ).to.be.revertedWith("NOT_CONTROLLER")
  // })
  // it("Price too much", async function () {
  //   await recipe.testSetCalcToPieAmount(parseEther("50"))
  //   await expect (
  //     oven.bake([owner.getAddress()], parseEther("1"), parseEther("25"))
  //   ).to.be.revertedWith("PRICE_ERROR")
  // })
  // it("Total insufficient funds", async function () {
  //   // price needed
  //   await recipe.testSetCalcToPieAmount(parseEther("310"))

  //   await expect (
  //     oven.bake(
  //       [user1.getAddress(), user2.getAddress(), user3.getAddress()],
  //       parseEther("10"),
  //       parseEther("350")
  //     )
  //   ).to.be.revertedWith("INSUFFICIENT_FUNDS")
  // })
  // it("Success (exact)", async function () {
  //   // price needed
  //   await recipe.testSetCalcToPieAmount(parseEther("300"))
  //   const users = [user1, user2, user3];
  //   for(const user of users) {
  //     // await expect(await oven.ethBalanceOf(user.getAddress())).to.be.eq(parseEther("100"));
  //     const value = await oven.ethBalanceOf(user.getAddress());
  //     console.log("value is: ",value.toString());
  //     // await expect(await oven.outputBalanceOf(user.getAddress())).to.be.eq(parseEther("0"));
  //   }

  //   console.log("---------------------------------------------------------------------");
  //   // await oven.bake(
  //   //   [user1.getAddress(), user2.getAddress(), user3.getAddress()],
  //   //   parseEther("45"),
  //   //   parseEther("300")
  //   // );

  //   await oven.bake(
  //     [user1.getAddress(), user2.getAddress(),user3.getAddress()],
  //     parseEther("30"),
  //     parseEther("300")
  //   )

  //   for(const user of users) {
  //     // await expect(await oven.ethBalanceOf(user.getAddress())).to.be.eq(parseEther("0"));
  //     // await expect(await oven.outputBalanceOf(user.getAddress())).to.be.eq(parseEther("10"));
  //     const value = await oven.outputBalanceOf(user.getAddress());
  //     console.log("value is: ",value.toString());
  //   };
  // })
  // it("Success (too much)", async function () {
  //   // price needed
  //   await recipe.testSetCalcToPieAmount(parseEther("150"))
  //   const users = [user1, user2, user3];
  //   for(const user of users) {
  //     await expect(await oven.ethBalanceOf(user.getAddress())).to.be.eq(parseEther("100"));
  //     await expect(await oven.outputBalanceOf(user.getAddress())).to.be.eq(parseEther("0"));
  //   };

  //   await oven.bake(
  //     [user1.getAddress(), user2.getAddress(), user3.getAddress()],
  //     parseEther("80"),
  //     parseEther("300")
  //   )

  //   for(const user of users) {
  //     const ethBalanceOf = await oven.ethBalanceOf(user.getAddress());
  //     console.log("ethBalanceOf is: ",ethBalanceOf.toString());
  //   };

  //   for(const user of users) {
  //     const outputBalanceOf = await oven.outputBalanceOf(user.getAddress());
  //     console.log("outputBalanceOf is: ",outputBalanceOf.toString());
  //   };

    // await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"));
    // await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("12"));

    // await expect(await oven.ethBalanceOf(user2.getAddress())).to.be.eq(parseEther("0"));
    // await expect(await oven.outputBalanceOf(user2.getAddress())).to.be.eq(parseEther("12"));

    // await expect(await oven.ethBalanceOf(user3.getAddress())).to.be.eq(parseEther("50"));
    // await expect(await oven.outputBalanceOf(user3.getAddress())).to.be.eq(parseEther("6"));
  // })

})

describe("Test deposit/withdraw eth + cap", function () {
  let pool : any;
  let recipe : any;
  let owner : any;
  let user1 : any;
  let user2 : any;
  let user3 : any;
  let oven : any;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();
    const TestPieRecipe = await ethers.getContractFactory(
      "TestPieRecipe"
    );
    recipe = await TestPieRecipe.deploy();
    await recipe.deployed();
    console.log(`recipe is: ${recipe.address}`);

    const TestPie = await ethers.getContractFactory(
      "TestPie"
    );
    pool = await TestPie.deploy(parseEther("10000000000"), recipe.address);
    await pool.deployed();
    console.log(`pool is: ${pool.address}`);

    const Oven = await ethers.getContractFactory("Oven");
    oven = await Oven.deploy(owner.getAddress(), pool.address, recipe.address);
    await oven.deployed();
    console.log(`oven is: ${oven.address}`);

    await oven.setCap(parseEther("1000"));
  });
  // it("Exceeding cap", async function () {
  //   await expect(await oven.getCap()).to.be.eq(parseEther("1000"));
  //   await expect (
  //     oven.connect(user1).deposit({ value: parseEther("1100") })
  //   ).to.be.revertedWith("MAX_CAP")
  // })
  // it("Exceeding cap multi", async function () {
  //   await expect(await oven.getCap()).to.be.eq(parseEther("1000"));
  //   await oven.connect(user1).deposit({ value: parseEther("400") })
  //   await oven.connect(user2).deposit({ value: parseEther("400") })
  //   await expect (
  //     oven.connect(user3).deposit({ value: parseEther("400") })
  //   ).to.be.revertedWith("MAX_CAP")

  //   await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("400"))
  //   await expect(await oven.ethBalanceOf(user2.getAddress())).to.be.eq(parseEther("400"))
  //   await expect(await oven.ethBalanceOf(user3.getAddress())).to.be.eq(parseEther("0"))
  // })
  // it("Deposit", async function () {
  //   await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"))

  //   await oven.connect(user1).deposit({ value: parseEther("150") })
  //   await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("150"))

  //   await oven.connect(user1).deposit({ value: parseEther("100") })
  //   await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("250"))
  // })

  it("Deposit2", async function () {
    await oven.connect(user1).deposit({ value: parseEther("123")});

    const balance1 = await oven.ethBalanceOf(user1.getAddress());
    console.log(`balance1 is: ${balance1}`);

    await oven.connect(user1).withdrawETH(parseEther("10"),user2.getAddress());

    const balanceUser1 = await oven.ethBalanceOf(user1.getAddress());
    console.log(`balanceUser1 is: ${balanceUser1}`);
    const balanceUser2 = await oven.ethBalanceOf(user2.getAddress());
    console.log(`balanceUser2 is: ${balanceUser2}`);
  })

  // it("Deposit ether transfer", async function () {
  //   await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"))

  //   await user1.sendTransaction({
  //     to: oven.address,
  //     value:parseEther("100")
  //   });
  //   await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("100"))
  //   await user1.sendTransaction({
  //     to: oven.address,
  //     value:parseEther("100")
  //   });
  //   await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("200"))
  // });


  it("Deposit and withdraw", async function () {

    await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"))
    await oven.connect(user1).deposit({ value: parseEther("100") })
    await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("100"))

    await oven.connect(user1).withdrawETH(parseEther("10"), user2.getAddress());
    await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("90"))

    // TODO validate user2 eth balance
  })
});

// describe("Test withdraw output", function () {

//   let pool : any;
//   let recipe : any;
//   let owner : any;
//   let user1 : any;
//   let user2 : any;
//   let user3 : any;
//   let oven : any;

//   beforeEach(async function () {
//     [owner, user1, user2, user3] = await ethers.getSigners();
//     const TestPieRecipe = await ethers.getContractFactory(
//       "TestPieRecipe"
//     );
//     recipe = await TestPieRecipe.deploy();
//     await recipe.deployed();

//     const TestPie = await ethers.getContractFactory(
//       "TestPie"
//     );
//     pool = await TestPie.deploy(parseEther("10000000000"), recipe.address);
//     await pool.deployed();

//     const Oven = await ethers.getContractFactory("Oven");
//     oven = await Oven.deploy(owner.getAddress(), pool.address, recipe.address);
//     await oven.deployed();

//     await oven.setCap(parseEther("1000"));
//     await oven.connect(user1).deposit({ value: parseEther("100") })

//     await recipe.testSetCalcToPieAmount(parseEther("90"))
//     await oven.bake(
//       [user1.getAddress()],
//       parseEther("100"),
//       parseEther("100")
//     )
//   });
//   it("Withdraw", async function () {
//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("10"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("100"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("0"));

//     await oven.connect(user1).withdrawOutput(user1.getAddress())

//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("10"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("100"));
//   })
//   it("Withdraw couple times", async function () {
//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("10"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("100"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("0"));

//     await oven.connect(user1).withdrawOutput(user1.getAddress())

//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("10"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("100"));

//     await oven.connect(user1).withdrawOutput(user1.getAddress())

//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("10"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("100"));

//   })
//   it("Withdraw to other ussr", async function () {
//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("10"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("100"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("0"));

//     await expect(await oven.ethBalanceOf(user2.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await oven.outputBalanceOf(user2.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await pool.balanceOf(user2.getAddress())).to.be.eq(parseEther("0"));

//     await oven.connect(user1).withdrawOutput(user2.getAddress())

//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("10"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("0"));

//     await expect(await oven.ethBalanceOf(user2.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await oven.outputBalanceOf(user2.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await pool.balanceOf(user2.getAddress())).to.be.eq(parseEther("100"));
//   })
//   it("Withdraw all", async function () {
//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("10"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("100"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("0"));

//     await oven.connect(user1).withdrawAll(user1.getAddress())

//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("100"));
//   })
//   it("Withdraw all ETH", async function () {
//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("10"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("100"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("0"));

//     await oven.connect(user1).withdrawAllETH(user1.getAddress())

//     await expect(await oven.ethBalanceOf(user1.getAddress())).to.be.eq(parseEther("0"));
//     await expect(await oven.outputBalanceOf(user1.getAddress())).to.be.eq(parseEther("100"));
//     await expect(await pool.balanceOf(user1.getAddress())).to.be.eq(parseEther("0"));
//   })
// });

// describe("Test controller functions", function () {
//   let pool : any;
//   let recipe : any;
//   let owner : any;
//   let user1 : any;
//   let user2 : any;
//   let user3 : any;
//   let oven : any;

//   beforeEach(async function () {
//     [owner, user1, user2, user3] = await ethers.getSigners();
//     const TestPieRecipe = await ethers.getContractFactory(
//       "TestPieRecipe"
//     );
//     recipe = await TestPieRecipe.deploy();
//     await recipe.deployed();

//     const TestPie = await ethers.getContractFactory(
//       "TestPie"
//     );
//     pool = await TestPie.deploy(parseEther("10000000000"), recipe.address);
//     await pool.deployed();

//     const Oven = await ethers.getContractFactory("Oven");
//     oven = await Oven.deploy(owner.getAddress(), pool.address, recipe.address);
//     await oven.deployed();
//   });
//   it("Bake restriction", async function () {
//     await expect (
//       oven.connect(user1).bake([owner.getAddress()], parseEther("1"), parseEther("2"))
//     ).to.be.revertedWith("NOT_CONTROLLER")
//   })
//   it("Cap restriction", async function () {
//     await expect (
//       oven.connect(user1).setCap(parseEther("1"))
//     ).to.be.revertedWith("NOT_CONTROLLER")
//   })
//   it("Set controller restriction", async function () {
//     const user1Addr = await user1.getAddress();
//     await expect (
//       oven.connect(user1).setController(user1Addr)
//     ).to.be.revertedWith("NOT_CONTROLLER")
//   })
//   it("Set controller", async function () {
//     const ownerAddr = await owner.getAddress();
//     const user1Addr = await user1.getAddress();
//     await expect(await oven.controller()).to.be.eq(ownerAddr);
//     await oven.setController(user1.getAddress())
//     await expect(await oven.controller()).to.be.eq(user1Addr);
//   })
// });