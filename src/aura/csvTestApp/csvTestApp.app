<aura:application extends="force:slds">
    <aura:attribute name="rows" type="object[]" default="[]"/>
    <aura:attribute name="headers" type="String[]" default="[]"/>
    
    <c:inputCSV rows="{!v.rows}" headers="{!v.headers}"/>
    <aura:if isTrue="{!not(empty(v.rows))}">
        <lightning:card >
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
                        <c:tableCell row="{!row}" colIdx="{!i}"/> <!-- reaches into array -->
                    </aura:iteration>
                    </tr>
                </aura:iteration>
            </tbody>
        </table>
        </lightning:card>
	</aura:if>
</aura:application>