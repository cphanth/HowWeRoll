// imports
import { LightningElement, api, wire, track } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
  @api selectedBoatTypeId = '';
  
  // Private
  error = undefined;
  
  @track searchOptions;
  
  // Wire a custom Apex method
  @wire(getBoatTypes)
    boatTypes({ error, data }) {
    if (data) {
      //map acts like for each loop except is able to return new array
      this.searchOptions = data.map(type => {
        return {
          label: type.Name,
          value: type.Id
        }
      });
      //unshift is used to make 'All Types' as first value in form at beginning of array
      this.searchOptions.unshift({ label: 'All Types', value: '' });
    } else if (error) {
      this.searchOptions = undefined;
      this.error = error;
    }
  }
  
  // Fires event that the search option has changed.
  // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
  handleSearchOptionChange(event) {
    // Create the const searchEvent
    // searchEvent must be the new custom event search
    this.selectedBoatTypeId = event.detail.value;
    const searchEvent = new CustomEvent('search', {detail: {boatTypeId: this.selectedBoatTypeId}});
    this.dispatchEvent(searchEvent);
  }
}