const BeerCaptain = artifacts.require("BeerCaptain")

contract("BeerCaptain", accounts => {
  it('allows to vote for tristan', async () => {
    const instance = await BeerCaptain.deployed()
    await instance.vote('tristan', { from: accounts[0] })
    const votes = await instance.getVotes('tristan')
    assert.equal(votes, 1, 'tristan has not one vote')
  })

  it('allows to vote for ralf', async () => {
    const instance = await BeerCaptain.deployed()
    let failed = false
    try {
      await instance.vote('ralf', { from: accounts[0] })
    } catch (e) {
      failed = true
    }
    assert.equal(failed, true, 'ralf has one vote')
  })

  it('allows to vote for ralf', async () => {
    const instance = await BeerCaptain.deployed()
    await instance.vote('ralf', { from: accounts[1] })
    const votes = await instance.getVotes('ralf')
    assert.equal(votes, 1, 'ralf has not one vote')
  })

  it('does not allow to vote for kostja', async () => {
    const instance = await BeerCaptain.deployed()
    try {
      await instance.vote('kostja', { from: accounts[0] })
    } catch (e) {}
    const votes = await instance.getVotes('kostja')
    assert.equal(votes, 0, 'kostja has not one vote')
  })
})
