require("./coverage");

describe("The user", function() {
    afterEach(uploadCoverage);

    it("should be able to open the list of clients", function() {
        browser.get("");

        element(by.css(".navigation-link")).click(); // Open the modal
        element(by.css("a[ui-sref=clients]")).click(); // Click on the "clients" option
        expect(element.all(by.css("table")).count()).toBe(1); // Check if the table exists
        // Must exist five fields per client
        expect(element.all(by.css("table tbody tr td.ng-binding")).then(
            /**
             * @param {{length}} elements
             */
            (elements) => elements.length % 5
        )).toBe(0);
    });

    it("should be able to open the details of a client", function() {
        browser.get("#!/clients");

        element.all(by.css("table tbody tr td.ng-binding")).first().click();
        expect(element.all(by.css("table")).count()).toBe(0); // Check if the table is gone
        expect(element.all(by.css(".ui-view [ng-controller]")).count()).toBe(1); // Check if the view was injected
        // 14 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(17); // + 3 field divisions
        expect(element.all(by.css("label")).count()).toBe(14);
        expect(element.all(by.css("input")).count()).toBe(13);
        expect(element.all(by.css("select")).count()).toBe(1);

        // Test masks
        expect(element(by.css("#cpf")).getAttribute("value")).toMatch(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
        expect(element(by.css("#mobile")).getAttribute("value")).toMatch(/\(\d{3}\) \d \d{4}-\d{4}/);
        expect(element(by.css("#phone")).getAttribute("value")).toMatch(/\(\d{3}\) \d{4}-\d{4}/);
        expect(element(by.css("#cep")).getAttribute("value")).toMatch(/\d{5}-\d{3}/);
    });

    it("should be able to navigate to the details of a client", function() {
        // Note: this client id is specified in the file "tests/webservice/database.json"
        browser.get("#!/clients/1");

        // 14 fields must exist
        expect(element.all(by.css(".column")).count()).toBe(17); // + 3 field divisions
        expect(element.all(by.css("label")).count()).toBe(14);
        expect(element.all(by.css("input")).count()).toBe(13);
        expect(element.all(by.css("select")).count()).toBe(1);

        // Test masks
        expect(element(by.css("#cpf")).getAttribute("value")).toMatch(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
        expect(element(by.css("#mobile")).getAttribute("value")).toMatch(/\(\d{3}\) \d \d{4}-\d{4}/);
        expect(element(by.css("#phone")).getAttribute("value")).toMatch(/\(\d{3}\) \d{4}-\d{4}/);
        expect(element(by.css("#cep")).getAttribute("value")).toMatch(/\d{5}-\d{3}/);
    });

    it("should be able to see the view for client creation", function() {
        browser.get("#!/clients");

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

        // Test masks
        let cpfInput = element(by.css("#cpf"));
        cpfInput.sendKeys("12345678912");
        expect(cpfInput.getAttribute("value")).toBe("123.456.789-12");

        let mobileInput = element(by.css("#mobile"));
        mobileInput.sendKeys("123456789123");
        expect(mobileInput.getAttribute("value")).toBe("(123) 4 5678-9123");

        let phoneInput = element(by.css("#phone"));
        phoneInput.sendKeys("12345678912");
        expect(phoneInput.getAttribute("value")).toBe("(123) 4567-8912");

        let cepInput = element(by.css("#cep"));
        cepInput.sendKeys("12345678");
        expect(cepInput.getAttribute("value")).toBe("12345-678");
    });
});