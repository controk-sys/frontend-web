describe("The user", function() {
    it("should be able to open the list of products", function() {
        browser.get("");

        element(by.css(".navigation-link")).click(); // Open the modal
        element(by.css("a[ui-sref=products]")).click(); // Click on the "products" option
        expect(element.all(by.css("table")).count()).toBe(1); // Check if the table exists
        // Must exist five fields per product
        expect(element.all(by.css("table tbody tr td.ng-binding")).then(
            /**
             * @param {{length}} elements
             */
            (elements) => elements.length % 5
        )).toBe(0);

        element(by.css("#code-coverage")).click();
    });

    it("should be able to open the details of a product", function() {
        browser.get("#/products");

        element.all(by.css("table tbody tr td.ng-binding")).first().click();
        expect(element.all(by.css("table")).count()).toBe(0); // Check if the table is gone
        expect(element.all(by.css(".ui-view [ng-controller]")).count()).toBe(1); // Check if the view was injected
        // 4 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(5); // + 1 field division
        expect(element.all(by.css("label")).count()).toBe(4);
        expect(element.all(by.css("input")).count()).toBe(4);

        element(by.css("#code-coverage")).click();
    });

    it("should be able to see the view for product creation", function() {
        browser.get("#/products");

        expect(element.all(by.css("button-plus button")).count()).toBe(1);
        element(by.css("button-plus button")).click();

        expect(element.all(by.css("button-plus button")).count()).toBe(0);
        expect(element.all(by.css("button-v button")).count()).toBe(1);

        expect(element.all(by.css(".ui-view [ng-controller]")).count()).toBe(1); // Check if the view was injected
        // 4 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(5); // + 1 field division
        expect(element.all(by.css("label")).count()).toBe(4);
        expect(element.all(by.css("input")).count()).toBe(4);

        element(by.css("#code-coverage")).click();
    });
});