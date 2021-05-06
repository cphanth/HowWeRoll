import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';

export default class BoatSearch extends LightningElement {
    isLoading = false;
    boatTypeId;

    // Handles loading event
    handleLoading(){
        this.isLoading = true;
    }

    // Handles done loading event
    handleDoneLoading(){
        this.isLoading = false;
    }

    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event){
        this.boatTypeId = event.detail.boatTypeId;
        getBoats(this.boatTypeId);
    }

    createNewBoat(){
        this[NavigationMixin.Navigate]({
            type: standard__ObjectPage,
            attributes: {
                objectApiName: 'Boat__c',
                actionName: 'new'
            },
        });
    }
}