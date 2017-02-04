# PapaParse4Lightning
Matthew Holt's excellent CSV Parsing lib PapaParse goes Lightning!

## Blog
<img src="http://i.imgur.com/oG4Sc16.gif" width="70%"/>

### The Apex Pain

Sometimes, you need your users to upload a file to Salesforce for processing. A lot of the time, you want to get that process in the hands of an admin with Dataloader, or a super user with Apttus, but you (especially ISVs) can't always escape the need for an end user to upload a CSV.

This has always been a painful process in Apex. FinancialForce wrote a great [resource](https://developer.financialforce.com/customizations/importing-large-csv-files-via-batch-apex/) on some of the options you have for parsing CSVs in Apex, Marty Chang wrote an [excellent Apex class](http://frombelvideres4thfloor.blogspot.com.es/2010/10/ietf-rfc-4180-compliant-csv-reader-for.html) to do some of the work for you, but the general vibe over in the Salesforce MVPs Slack `#code` channel?

> [10:17:02]: csv parsing in apex sucks

Then [Brian Fear](https://twitter.com/sfdcfox) dropped the real question...

> [2:21:17]: @cdcarter It'd be better to write a CSV parser in JavaScript, and use the API to insert the records. I wonder why nobody tries to do it that way...?

Well, lets think about it. The modern browser is fast. Javascript can do a LOT. Apex is slow and cannot do a lot. With the help of a [Peter Knolle blog post](peterknolle.com/file-upload-lightning-component/) and the HTML5 File API I was able to pretty quickly get a working component to upload a file and read the body. There's one benefit that Brian didn't mention at first though. If we use Javascript, we don't have to write a CSV parser. We can use someone elses!

### Enter PapaParse

[PapaParse](http://papaparse.com/demo) is a fantastic, open source, RFC compliant, well tested, and widely used library for parsing CSVs in the browser. Plus, because it's not doing anything funky or insecure, it's Locker Service compliant. This is some dank Javascript.

```
Papa.parse(fileInput.files[0], {
	complete: function(results) {
		console.log(results);
	}
});
```

Well, that demo code looks simple enough...

I dropped it in a static resource, gave it a test by logging to console, and it Just Worked (tm). 

### baseCSV

So we built baseCSV, about 20 lines of Javascript as an extensible component. Write a component that extends baseCSV, call `helper.parse(someCSV)`, and then the attributes `rows` and `header` will be automatically populated with the results! 

Once they're loaded, you can display them to the end user like we do in these demos, or use a standard @auraEnabled apex action to parse your rows in bulk!

### inputCSV

But just parsing a string of CSV isn't that interesting, my use case was for loading a file! As I wrote above, the HTML5 File API makes this a snap. In fact, we just provide an `<input type="file"/>` to baseCSV and the rest is taken care of. 

### testApp

The testapp turned out to be all XML markup, and no code! 

<img src="http://i.imgur.com/FLhoGGs.gif" width="70%"/>

```
<aura:application extends="force:slds">
    <aura:attribute name="rows" type="object[]" default="[]"/>
    <aura:attribute name="headers" type="String[]" default="[]"/>
    
    <aura:handler name="change" value="{!v.rows}" action="{!c.changeRows}"/>
    <c:localFile data="{!v.rows}" headers="{!v.headers}"/>
    
    <aura:if isTrue="{!not(empty(v.rows))}">
        <lightning:card>
		<aura:set attribute="title">
			Parsed Rows: {!v.rows.length}
        </aura:set>
        <table class="slds-table slds-table--bordered slds-table--cell-buffer">
            <thead>
                <tr class="slds-text-title--caps">
                    <aura:iteration items="{!v.headers}" var="row">
                    <th scope="col">
                        <div class="slds-truncate" title="{!row}">{!row}</div>
                    </th>
                    </aura:iteration>
                </tr>
            </thead>
            <tbody>
                <aura:iteration items="{!v.rows}" var="row">
                    <tr>
                    <aura:iteration items="{!v.headers}" var="head" indexVar="i">
                        <c:tableCell row="{!row}" colIdx="{!i}"/>
                        </aura:iteration>
                    </tr>
                </aura:iteration>
            </tbody>
        </table>
        </lightning:card>
    </aura:if>
</aura:application>
```

## Components
The initial scope of PapaParse4Lightning is to provide a

- [ ] a lightning app that parses a CSV and displays a table of it
- [ ] an extensible component that loads PapaParse and parses a file or data
- [ ] a UI component that parses a CSV file
