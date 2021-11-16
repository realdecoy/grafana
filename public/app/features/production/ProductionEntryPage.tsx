import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMount } from 'react-use';
import { hot } from 'react-hot-loader';
import { PageToolbar, PageHeader, useStyles2, Icon, Modal } from '@grafana/ui';
import { ProductionVolumeDTO, StoreState } from 'app/types';
import {
  initProductionEntryPage,
  submitProductionEntry,
  updateProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
} from './state/actions';
import ProductionEntryForm from './ProductionEntryForm';
import EditBaselineEntryForm from './EditProductionEntryForm';
import { getLoginStyles } from 'app/core/components/Login/LoginLayout';
import { Branding } from 'app/core/components/Branding/Branding';

export interface OwnProps {
  onDismiss: () => void;
}

function mapStateToProps(state: StoreState) {
  const productionEntryState = state.Production;
  const {
    isUpdating,
    isModalOpen,
    editProductionEntryId,
    productionEntries,
    productionEntriesAreLoading,
  } = productionEntryState;
  return {
    isUpdating,
    isModalOpen,
    editProductionEntryId,
    productionEntries,
    productionEntriesAreLoading,
  };
}

const mapDispatchToProps = {
  initProductionEntryPage,
  submitProductionEntry,
  updateProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = OwnProps & ConnectedProps<typeof connector>;

export function ProductionEntryPage({
  isUpdating,
  isModalOpen,
  editProductionEntryId,
  productionEntries,
  productionEntriesAreLoading,
  updateProductionEntry,
  initProductionEntryPage,
  submitProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
}: Props) {
  useMount(() => initProductionEntryPage());

  const loginStyles = useStyles2(getLoginStyles);

  return (
    <div className="baseline-entry">
      <PageHeader title={`HiPro Energy Production`} className="no-margin" pageIcon="graph-bar">
        <Branding.LoginLogo className={loginStyles.pageHeaderLogo} />
      </PageHeader>
      <PageToolbar title={`Production Entry`} className="no-margin" />
      <div className="sub-title">Possible microcopy providing high level explanation of the chart.</div>
      <ProductionEntryForm addBaselineEntry={submitProductionEntry} isSavingBaselineEntry={isUpdating} />
      <hr className="spacious"></hr>
      <div
        className={
          isUpdating || productionEntriesAreLoading
            ? 'baseline-no-scroll baseline-entry-table-container'
            : 'baseline-entry-table-container'
        }
      >
        <table className="baseline-entry-table filter-table form-inline filter-table--hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>
                Date
              </th>
              <th>Warehouse staff</th>
              <th>Staff - Total  </th>
              <th>HiPro store & office staff </th>
              <th>No. of staff – Office - Sales  </th>
              <th> No. of staff – Office - Accounts</th>
              <th>No. of staff – Office - Group Purchasing  </th>
              <th>No. of staff – Office - Store Purchasing   </th>
              <th>No. of staff – Store - Customer Service  </th>
              <th>No of Staff - Store - Cashiers </th>
              <th>No of Staff - Store - Pharmacy </th>
              <th>No of Staff - Store - Sales Floor</th>
              <th>
                No of Staff - Store - Receival</th>
              <th>No of Staff - Store - Warehouse</th>
              <th>
                No. of customers - Total
              </th>
              <th>No. of customers - Store</th>
              <th>No. of customers - Warehouse</th>
              <th>
                No. of transactions – Total
              </th>
              <th>No. of transactions Item/Department – A</th>
              <th>No. of transactions Item/Department – B</th>
              <th>No. of transactions Item/Department – C</th>
              <th> No. of transactions Item/Department – D</th>
              <th>No. of transactions Item/Department - E</th>
              <th>Truck deliveries – Type A</th>
              <th>Truck deliveries – Type B</th>
              <th>Truck deliveries – Type C</th>
              <th>Truck deliveries – Type D</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productionEntries.map((p: ProductionVolumeDTO) => {
              return renderBaselineRecord(p, openEditModal, archiveProduction);
            })}
          </tbody>
        </table>
        {renderLoadingBaselineEntries(productionEntriesAreLoading, isUpdating)}
      </div>
      {renderEditBaselineEntryModal(
        productionEntriesAreLoading,
        isUpdating,
        isModalOpen,
        editProductionEntryId,
        productionEntries,
        closeEditModal,
        updateProductionEntry
      )}
    </div>
  );
}

const renderLoadingBaselineEntries = (isLoading: boolean, isUpdating: boolean) => {
  let el;

  if (isLoading === true || isUpdating === true) {
    el = (
      <div className="baseline-data-loading-container">
        <div className="baseline-data-loading-msg">Loading...</div>
      </div>
    );
  } else {
    el = null;
  }
  return el;
};

const renderEditBaselineEntryModal = (
  isLoading: boolean,
  isUpdating: boolean,
  isModalOpen: boolean,
  editBaselineEntryId: number,
  productionEntries: ProductionVolumeDTO[],
  closeEditModal: any,
  updateBaselineEntry: any
) => {
  let el;

  if (isLoading === true || productionEntries.length <= 0 || editBaselineEntryId <= 0) {
    el = null;
  } else {
    el = (
      <Modal title="Edit Baseline Entry" icon="save" onDismiss={closeEditModal} isOpen={isModalOpen}>
        <div>
          <EditBaselineEntryForm
            existingBaseline={
              (productionEntries.find((p) => {
                return p.id?.toString() === editBaselineEntryId.toString();
              }) ?? {}) as ProductionVolumeDTO
            }
            updateBaselineEntry={updateBaselineEntry}
            isSavingBaselineEntry={isUpdating}
          />
        </div>
      </Modal>
    );
  }
  return el;
};

const renderBaselineRecord = (ProductionVolumeEntry: ProductionVolumeDTO, openEditModal: any, archiveBaseline: any) => {

  return (
    <tr key={ProductionVolumeEntry.id}>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.id}>
          {ProductionVolumeEntry.id}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.day}>
          {ProductionVolumeEntry.day}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.wareHouseStaff}>
          {ProductionVolumeEntry.wareHouseStaff}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.storeEmployees}>
          {ProductionVolumeEntry.storeEmployees}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.staffTotal}>
          {ProductionVolumeEntry.staffTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffOfficeSales}>
          {ProductionVolumeEntry.noOfStaffOfficeSales}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffOfficeAccounts}>
          {ProductionVolumeEntry.noOfStaffOfficeAccounts}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffOfficeGroupPurchasing}>
          {ProductionVolumeEntry.noOfStaffOfficeGroupPurchasing}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffOfficeStorePurchasing}>
          {ProductionVolumeEntry.noOfStaffOfficeStorePurchasing}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStoreCustomerService}>
          {ProductionVolumeEntry.noOfStaffStoreCustomerService}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStoreCashiers}>
          {ProductionVolumeEntry.noOfStaffStoreCashiers}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStorePharmacy}>
          {ProductionVolumeEntry.noOfStaffStorePharmacy}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStoreSalesFloor}>
          {ProductionVolumeEntry.noOfStaffStoreSalesFloor}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStoreReceival}>
          {ProductionVolumeEntry.noOfStaffStoreReceival}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.wareHouseHiProStore}>
          {ProductionVolumeEntry.wareHouseHiProStore}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfCustomersTotal}>
          {ProductionVolumeEntry.noOfCustomersTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfCustomersStore}>
          {ProductionVolumeEntry.noOfCustomersStore}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOftransactionstotal}>
          {ProductionVolumeEntry.noOftransactionstotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.nooftransactionsitemdepartmenta}>
          {ProductionVolumeEntry.nooftransactionsitemdepartmenta}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.nooftransactionsitemdepartmentb}>
          {ProductionVolumeEntry.nooftransactionsitemdepartmentb}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.nooftransactionsitemdepartmentc}>
          {ProductionVolumeEntry.nooftransactionsitemdepartmentc}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.nooftransactionsitemdepartmentd}>
          {ProductionVolumeEntry.nooftransactionsitemdepartmentd}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.nooftransactionsitemdepartmente}>
          {ProductionVolumeEntry.nooftransactionsitemdepartmente}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTotal}>
          {ProductionVolumeEntry.truckDeliveriesTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTypea}>
          {ProductionVolumeEntry.truckDeliveriesTypea}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTypeb}>
          {ProductionVolumeEntry.truckDeliveriesTypeb}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTypec}>
          {ProductionVolumeEntry.truckDeliveriesTypec}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTyped}>
          {ProductionVolumeEntry.truckDeliveriesTyped}
        </a>
      </td>
      <td className="link-td">
        <Icon
          name="pen"
          title="Edit Baseline"
          onClick={() => {
            openEditModal(ProductionVolumeEntry.id);
          }}
        />
        <Icon
          className="archive-link"
          name="folder-upload"
          title="Archive Baseline"
          onClick={() => {
            archiveBaseline(ProductionVolumeEntry.id);
          }}
        />
      </td>
    </tr>
  );
};

export default hot(module)(connector(ProductionEntryPage));
