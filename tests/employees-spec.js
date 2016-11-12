describe("The user", function() {
    it("should be able to see the list of employees", function() {
        browser.get("");

        element(by.css(".navigation-link")).click(); // Open the modal
        element(by.css("a[ui-sref=employees]")).click(); // Click on the "clients" option
        expect(element.all(by.css("table")).count()).toBe(1); // Check if the table exists
        // Must exist five fields per employee
        expect(element.all(by.css("table tbody tr td.ng-binding")).then(function (elements) {
            return elements.length % 6;
        })).toBe(0);
    });
    it("should be able to open the details of a employee", function() {
        browser.get("#/employees");

        element.all(by.css("table tbody tr td.ng-binding")).first().click();
        expect(element.all(by.css("table")).count()).toBe(0); // Check if the table is gone
        expect(element.all(by.css(".ui-view [ng-controller]")).count()).toBe(1); // Check if the view was injected
        // 15 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(18); // + 3 field divisions
        expect(element.all(by.css("label")).count()).toBe(15);
        expect(element.all(by.css("input")).count()).toBe(14);
        expect(element.all(by.css("select")).count()).toBe(1);
    });
    it("should be able to see the view for client creation", function() {
        browser.get("#/employees");

        expect(element.all(by.css("button-plus button")).count()).toBe(1);
        element(by.css("button-plus button")).click();

        expect(element.all(by.css("button-plus button")).count()).toBe(0);
        expect(element.all(by.css("button-v button")).count()).toBe(1);

        expect(element.all(by.css(".ui-view [ng-controller]")).count()).toBe(1); // Check if the view was injected
        // 15 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(18); // + 3 field divisions
        expect(element.all(by.css("label")).count()).toBe(15);
        expect(element.all(by.css("input")).count()).toBe(14);
        expect(element.all(by.css("select")).count()).toBe(1);
        expect(element.all(by.css("select option")).count()).toBe(3);
    });
});