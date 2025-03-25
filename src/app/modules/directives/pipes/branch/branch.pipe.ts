import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branch',
})
export class BranchPipe implements PipeTransform {
  transform(value: string, organisationMaster) {
    let selectedorg = organisationMaster.find((f) => {
      return f.OrgBranchCode === value;
    });
    return selectedorg ? selectedorg.OrgName : '';
  }
}
