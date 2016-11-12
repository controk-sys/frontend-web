describe("The user", function() {
    it("should be able to open the list of clients", function() {
        browser.get("");

        element(by.css(".navigation-link")).click(); // Open the modal
        element(by.css("a[ui-sref=clients]")).click(); // Click on the "clients" option
        expect(element.all(by.css("table")).count()).toBe(1); // Check if the table exists
        // Must exist five fields per client
        expect(element.all(by.css("table tbody tr td.ng-binding")).then(function (elements) {
            return elements.length % 5;
        })).toBe(0);
    });
    it("should be able to open the details of a client", function() {
        browser.get("#/clients");

        element.all(by.css("table tbody tr td.ng-binding")).first().click();
        expect(element.all(by.css("table")).count()).toBe(0); // Check if the table is gone
        expect(element.all(by.css(".ui-view [ng-controller]")).count()).toBe(1); // Check if the view was injected
        // 14 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(17); // + 3 field divisions
        expect(element.all(by.css("label")).count()).toBe(14);
        expect(element.all(by.css("input")).count()).toBe(13);
        expect(element.all(by.css("select")).count()).toBe(1);
    });
    it("should be able to see the view for client creation", function() {
        browser.get("#/clients");

        expect(element.all(by.css("button-plus button")).count()).toBe(1);
        element(by.css("button-plus button")).click();

        expect(element.all(by.css("button-plus button")).count()).toBe(0);
        expect(element.all(by.css("button-v button")).count()).toBe(1);

        expect(element.all(by.css(".ui-view [ng-controller]")).count()).toBe(1); // Check if the view was injected
        // 14 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(17); // + 3 field divisions
        expect(element.all(by.css("label")).count()).toBe(14);
        expect(element.all(by.css("input")).count()).toBe(13);
        expect(element.all(by.css("select")).count()).toBe(1);
        expect(element.all(by.css("select option")).count()).toBe(3);
    });
});