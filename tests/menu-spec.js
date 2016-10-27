describe("controk menu list", function() {
    it("should open the popover", function() {
        browser.get("");

        expect(element.all(by.css(".popover-item")).count()).toBe(6);

        expect(element.all(by.css(".popover-open")).count()).toBe(0);
        element(by.css(".navigation-link")).click();
        expect(element.all(by.css(".popover-open")).count()).toBe(1);
        element(by.css(".navigation-link")).click();
        expect(element.all(by.css(".popover-open")).count()).toBe(0);
    });
});