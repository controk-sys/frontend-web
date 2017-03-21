require("./coverage")

describe("menu list", () => {
  afterEach(uploadCoverage)

  it("should open the popover", () => {
    browser.get("")

    expect(element.all(by.css(".popover-item")).count()).toBe(6)

    expect(element.all(by.css(".popover-open")).count()).toBe(0)
    element(by.css(".navigation-link")).click() // Open the modal
    expect(element.all(by.css(".popover-open")).count()).toBe(1)
    element(by.css(".navigation-link")).click() // Close the modal
    expect(element.all(by.css(".popover-open")).count()).toBe(0)
  })
})
