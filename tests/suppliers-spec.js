describe("The user", function() {
    it("should be able to open the list of suppliers", function() {
        browser.get("");

        element(by.css(".navigation-link")).click(); // Open the modal
        element(by.css("a[ui-sref=suppliers]")).click(); // Click on the "suppliers" option
        expect(element.all(by.css("table")).count()).toBe(1); // Check if the table exists
        // Must exist five fields per supplier
        expect(element.all(by.css("table tbody tr td.ng-binding")).then(function (elements) {
            return elements.length % 4;
        })).toBe(0);
    });
    it("should be able to open the details of a supplier", function() {
        browser.get("#/suppliers");

        element.all(by.css("table tbody tr td.ng-binding")).first().click();
        expect(element.all(by.css("table")).count()).toBe(0); // Check if the table is gone
        expect(element.all(by.css(".ui-view [ng-controller]")).count()).toBe(1); // Check if the view was injected
        // 13 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(16); // + 3 field divisions
        expect(element.all(by.css("label")).count()).toBe(13);
        expect(element.all(by.css("input")).count()).toBe(12);
        expect(element.all(by.css("select")).count()).toBe(1);

        // Test masks
        expect(element(by.css("#cnpj")).getAttribute("value")).toMatch(/\d{2}\.\d{3}\.\d{3}\/0001-\d{2}/);
        expect(element(by.css("#mobile")).getAttribute("value")).toMatch(/\(\d{3}\) \d \d{4}-\d{4}/);
        expect(element(by.css("#phone")).getAttribute("value")).toMatch(/\(\d{3}\) \d{4}-\d{4}/);
        expect(element(by.css("#cep")).getAttribute("value")).toMatch(/\d{5}-\d{3}/);
    });

    it("should be able to see the view for supplier creation", function() {
        browser.get("#/suppliers");

        expect(element.all(by.css("button-plus button")).count()).toBe(1);
        element(by.css("button-plus button")).click();

        expect(element.all(by.css("button-plus button")).count()).toBe(0);
        expect(element.all(by.css("button-v button")).count()).toBe(1);

        expect(element.all(by.css(".ui-view [ng-controller]")).count()).toBe(1); // Check if the view was injected
        // 13 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(16); // + 3 field divisions
        expect(element.all(by.css("label")).count()).toBe(13);
        expect(element.all(by.css("input")).count()).toBe(12);
        expect(element.all(by.css("select")).count()).toBe(1);
        expect(element.all(by.css("select option")).count()).toBe(3);

        // Test masks
        var cpfInput = element(by.css("#cnpj"));
        cpfInput.sendKeys("12345678000123");
        expect(cpfInput.getAttribute("value")).toBe("12.345.678/0001-23");

        var mobileInput = element(by.css("#mobile"));
        mobileInput.sendKeys("123456789123");
        expect(mobileInput.getAttribute("value")).toBe("(123) 4 5678-9123");

        var phoneInput = element(by.css("#phone"));
        phoneInput.sendKeys("12345678912");
        expect(phoneInput.getAttribute("value")).toBe("(123) 4567-8912");

        var cepInput = element(by.css("#cep"));
        cepInput.sendKeys("12345678");
        expect(cepInput.getAttribute("value")).toBe("12345-678");
    });
});