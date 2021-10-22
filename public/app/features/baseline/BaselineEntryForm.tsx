import React, { FC } from 'react';
import { format } from 'date-fns';
import { Button, DatePickerWithInput, Field, FieldSet, Form, Input } from '@grafana/ui';
import { BaselineEntryFields } from './types';

const DATE_FORMAT = 'yyyy-MM-dd';

export interface Props {
  isSavingBaselineEntry: boolean;
  addBaselineEntry: (payload: BaselineEntryFields) => void;
}

export const BaselineEntryForm: FC<Props> = ({ isSavingBaselineEntry, addBaselineEntry }) => {
  const onSubmitBaselineEntry = (data: BaselineEntryFields) => {
    addBaselineEntry(data);
    clearForm();
  };
  const clearForm = () => {
    (document.getElementById('baseline-entry-form') as HTMLInputElement & {
      reset: () => boolean;
    }).reset();
  };

  const onSubmit = (data: any) => {
    console.log(data);
    onSubmitBaselineEntry(data);
  };

  return (
    <Form id="baseline-entry-form" className="baseline-entry-form" onSubmit={onSubmit} validateOn="onBlur">
      {({ register, errors, clearErrors, setValue }) => {
        return (
          <FieldSet className="baseline-field-set">
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Start Date"
                invalid={!!errors.startDate}
                error="Start Date is required [format: yyyy-mm-dd]"
                disabled={isSavingBaselineEntry}
              >
                <DatePickerWithInput
                  id="baseline-start-date"
                  placeholder="Start Date"
                  closeOnSelect={true}
                  {...register('startDate', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const formattedValue = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('baseline-start-date') as HTMLInputElement;
                    el.value = formattedValue;
                    setValue('startDate', formattedValue, { shouldValidate: true });
                  }}
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="End Date"
                invalid={!!errors.endDate}
                error="End Date is required [format: yyyy-mm-dd]"
                disabled={isSavingBaselineEntry}
              >
                <DatePickerWithInput
                  id="baseline-end-date"
                  placeholder="End Date"
                  closeOnSelect={true}
                  {...register('endDate', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const formattedValue = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('baseline-end-date') as HTMLInputElement;
                    el.value = formattedValue;
                    setValue('endDate', formattedValue, { shouldValidate: true });
                  }}
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. Of Days"
                invalid={!!errors.noOfDays}
                error="No. of Days nust me a number [e.g. 30]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfDays', { required: false, pattern: /^[0-9]+$/g })}
                  id="baseline-no-of-days"
                  placeholder="No. Of Days"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Invoice Date"
                invalid={!!errors.invoiceDate}
                error="Invoice Date is required [format: yyyy-mm-dd]"
                disabled={isSavingBaselineEntry}
              >
                <DatePickerWithInput
                  id="baseline-invoice-date"
                  placeholder="Invoice Date"
                  closeOnSelect={true}
                  {...register('invoiceDate', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const formattedValue = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('baseline-invoice-date') as HTMLInputElement;
                    el.value = formattedValue;
                    setValue('invoiceDate', formattedValue, { shouldValidate: true });
                  }}
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Kilowatt-hour (kWh)"
                invalid={!!errors.kwh}
                error="kWh is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('kwh', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-kwh"
                  placeholder="kWh"
                  defaultValue={''}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Minimum kW"
                invalid={!!errors.minKw}
                error="Min. kW is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('minKw', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-min-kw"
                  placeholder="Min. kW"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Maximum kW"
                invalid={!!errors.maxKw}
                error="Max. kW is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('maxKw', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-max-kw"
                  placeholder="Max. kW"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Average kW"
                invalid={!!errors.avgKw}
                error="Average kW is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('avgKw', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-avg-kw"
                  placeholder="Average kW"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Average kVA"
                invalid={!!errors.avgKva}
                error="Average kVA is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('avgKva', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-avg-kva"
                  placeholder="Average kVA"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Power Factor (PF)"
                invalid={!!errors.pf}
                error="PF is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('pf', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-pf"
                  placeholder="PF"
                  defaultValue={''}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Minimum PF"
                invalid={!!errors.minPf}
                error="Min. PF is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('minPf', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-min-pf"
                  placeholder="Min. PF"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Maximum PF"
                invalid={!!errors.maxPf}
                error="Max. PF is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('maxPf', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-max-pf"
                  placeholder="Max. PF"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Rate"
                invalid={!!errors.rate}
                error="Rate is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('rate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-rate"
                  placeholder="Rate"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Energy Rate"
                invalid={!!errors.energyRate}
                error="Energy Rate is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('energyRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-energy-rate"
                  placeholder="Energy Rate"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Fuel Rate"
                invalid={!!errors.fuelRate}
                error="Fuel Rate is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('fuelRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-fuel-rate"
                  placeholder="Fuel Rate"
                  defaultValue={''}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="KVA Rate"
                invalid={!!errors.kvaRate}
                error="KVA Rate is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('kvaRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-kva-rate"
                  placeholder="KVA Rate"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Fuel & IPP Rate"
                invalid={!!errors.ippRate}
                error="Fuel & IPP Rate is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('ippRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-rate"
                  placeholder="Fuel & IPP Rate"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="IPP Variable Rate"
                invalid={!!errors.ippVariableRate}
                error="IPP Variable Rate is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('ippVariableRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-variable-rate"
                  placeholder="IPP Variable Rate"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Energy Charge"
                invalid={!!errors.energyCharge}
                error="Energy Charge is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('energyCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-energy-charge"
                  placeholder="Energy Charge"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Fuel & IPP Charge"
                invalid={!!errors.ippCharge}
                error="Fuel & IPP Charge is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('ippCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-charge"
                  placeholder="Fuel & IPP charge"
                  defaultValue={''}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="IPP Variable Charge"
                invalid={!!errors.ippVariableCharge}
                error="IPP Variable Charge is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('ippVariableCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-variable-charge"
                  placeholder="IPP Variable Charge"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="KVA Charge"
                invalid={!!errors.kvaCharge}
                error="KVA Charge is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('kvaCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-kva-charge"
                  placeholder="KVA Charge"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Current Charges"
                invalid={!!errors.currentCharges}
                error="Current Charges is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('currentCharges', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-current-charge"
                  placeholder="Current Charges"
                  defaultValue={''}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Sales Tax"
                invalid={!!errors.salesTax}
                error="Sales Tax is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('salesTax', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-current-charge"
                  placeholder="Sales Tax"
                  defaultValue={''}
                />
              </Field>
              <div className="gf-form-button-row">
                <Button variant="primary" disabled={isSavingBaselineEntry} aria-label="Baseline entry submit button">
                  Submit
                </Button>
              </div>
            </div>
          </FieldSet>
        );
      }}
    </Form>
  );
};

export default BaselineEntryForm;
