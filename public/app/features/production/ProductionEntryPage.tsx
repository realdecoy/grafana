import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMount } from 'react-use';
import { hot } from 'react-hot-loader';
import { PageToolbar, PageHeader, useStyles2, Icon, Modal, Button } from '@grafana/ui';
import { ProductionVolumeDTO, StoreState } from 'app/types';
import {
  initProductionEntryPage,
  submitProductionEntry,
  updateProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
  closeSaveModal,
  openSaveModal,
} from './state/actions';
import ProductionEntryForm from './ProductionEntryForm';
import EditBaselineEntryForm from './EditProductionEntryForm';
import { getLoginStyles } from 'app/core/components/Login/LoginLayout';
import { Branding } from 'app/core/components/Branding/Branding';
import { format } from 'date-fns';

import DataTable from 'react-data-table-component';

export interface OwnProps {
  onDismiss: () => void;
}

function mapStateToProps(state: StoreState) {
  const productionEntryState = state.Production;
  const {
    isUpdating,
    isModalOpen,
    isModalSaveOpen,
    editProductionEntryId,
    productionEntries,
    productionEntriesAreLoading,
    archivedId,
  } = productionEntryState;
  return {
    isUpdating,
    isModalOpen,
    isModalSaveOpen,
    editProductionEntryId,
    productionEntries,
    productionEntriesAreLoading,
    archivedId,
  };
}

const mapDispatchToProps = {
  initProductionEntryPage,
  submitProductionEntry,
  updateProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
  openSaveModal,
  closeSaveModal,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = OwnProps & ConnectedProps<typeof connector>;

export function ProductionEntryPage({
  isUpdating,
  isModalOpen,
  isModalSaveOpen,
  archivedId,
  editProductionEntryId,
  productionEntries,
  productionEntriesAreLoading,
  updateProductionEntry,
  initProductionEntryPage,
  submitProductionEntry,
  openEditModal,
  openSaveModal,
  closeSaveModal,
  closeEditModal,
  archiveProduction,
}: Props) {
  useMount(() => initProductionEntryPage());

  const loginStyles = useStyles2(getLoginStyles);
  const columns = [
    {
      name: 'No',
      selector: (row: { id: String }) => row.id,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row: { day: String }) => format(Number(row.day) * 1000, 'yyyy-MM-dd'),
      sortable: true,
    },
    {
      name: 'Warehouse staff',
      selector: (row: { wareHouseStaff: String }) => row.wareHouseStaff,
      minWidth: '300px',
    },
    {
      name: 'Store Employees / Staff',
      selector: (row: { storeEmployees: String }) => row.storeEmployees,
      minWidth: '300px',
    },
    {
      name: 'Staff - Total',
      selector: (row: { staffTotal: String }) => row.staffTotal,
      minWidth: '300px',
    },
    {
      name: 'HiPro store & office staff	',
      selector: (row: { wareHouseStaff: number,staffTotal: number }) => row.wareHouseStaff + row.staffTotal,
      minWidth: '300px',
    },
    {
      name: 'No. of staff – Office - Sales',
      selector: (row: { noOfStaffOfficeSales: String }) => row.noOfStaffOfficeSales,
      minWidth: '300px',
    },
    {
      name: 'No. of staff – Office - Accounts',
      selector: (row: { noOfStaffOfficeAccounts: String }) => row.noOfStaffOfficeAccounts,
      minWidth: '300px',
    },
    {
      name: 'No. of staff – Office - Group Purchasing',
      selector: (row: { noOfStaffOfficeGroupPurchasing: String }) => row.noOfStaffOfficeGroupPurchasing,
      minWidth: '300px',
    },
    {
      name: 'No of Staff - Store - Cashiers',
      selector: (row: { noOfStaffStoreCashiers: String }) => row.noOfStaffStoreCashiers,
      minWidth: '300px',
    },
    {
      name: 'No. of staff – Store - Customer Service',
      selector: (row: { noOfStaffStoreCustomerService: String }) => row.noOfStaffStoreCustomerService,
      minWidth: '300px',
    },
    {
      name: 'No of Staff - Store - Pharmacy',
      selector: (row: { noOfStaffStorePharmacy: String }) => row.noOfStaffStorePharmacy,
      minWidth: '300px',
    },
    {
      name: 'No of Staff - Store - Sales Floor',
      selector: (row: { noOfStaffStoreSalesFloor: String }) => row.noOfStaffStoreSalesFloor,
      minWidth: '300px',
    },
    {
      name: 'No of Staff - Store - Receival',
      selector: (row: { noOfStaffStoreReceival: String }) => row.noOfStaffStoreReceival,
      minWidth: '300px',
    },
    {
      name: 'No. of customers - Total',
      selector: (row: { noOfCustomersTotal: String }) => row.noOfCustomersTotal,
      minWidth: '300px',
    },
    {
      name: 'No. of customers - Store',
      selector: (row: { noOfCustomersStore: String }) => row.noOfCustomersStore,
      minWidth: '300px',
    },
    {
      name: 'No. of transactions – Total',
      selector: (row: { noOfTransactionsTotal: String }) => row.noOfTransactionsTotal,
      minWidth: '300px',
    },
    {
      name: 'No. of transactions Item/Department – A',
      selector: (row: { noOfTransactionsItemDepartmentA: String }) => row.noOfTransactionsItemDepartmentA,
      minWidth: '300px',
    },
    {
      name: 'No. of transactions Item/Department – B',
      selector: (row: { noOfTransactionsItemDepartmentB: String }) => row.noOfTransactionsItemDepartmentB,
      minWidth: '300px',
    },
    {
      name: 'No. of transactions Item/Department – C',
      selector: (row: { noOfTransactionsItemDepartmentC: String }) => row.noOfTransactionsItemDepartmentC,
      minWidth: '300px',
    },
    {
      name: 'No. of transactions Item/Department – D',
      selector: (row: { noOfTransactionsItemDepartmentD: String }) => row.noOfTransactionsItemDepartmentD,
      minWidth: '300px',
    },
    {
      name: 'No. of transactions Item/Department - E',
      selector: (row: { noOfTransactionsItemDepartmentE: String }) => row.noOfTransactionsItemDepartmentE,
      minWidth: '300px',
    },
    {
      name: 'Truck deliveries - Total',
      selector: (row: { truckDeliveriesTotal: String }) => row.truckDeliveriesTotal,
      minWidth: '300px',
    },
    {
      name: 'Truck deliveries – Type A',
      selector: (row: { truckDeliveriesTypeA: String }) => row.truckDeliveriesTypeA,
      minWidth: '300px',
    },
    {
      name: 'Truck deliveries – Type B',
      selector: (row: { truckDeliveriesTypeB: String }) => row.truckDeliveriesTypeB,
      minWidth: '300px',
    },
    {
      name: 'Truck deliveries – Type C',
      selector: (row: { truckDeliveriesTypeC: String }) => row.truckDeliveriesTypeC,
      minWidth: '300px',
    },
    {
      name: 'Truck deliveries – Type D',
      selector: (row: { truckDeliveriesTypeD: String }) => row.truckDeliveriesTypeD,
      minWidth: '300px',
    },
    {
      name: 'Actions',
      cell: (row: { id: number }) => (
        <>
          <Icon
            name="pen"
            title="Edit Baseline"
            onClick={() => {
              openEditModal(row.id);
            }}
          />
          <Icon
            className="archive-link"
            name="folder-upload"
            title="Archive Baseline"
            onClick={() => {
              openSaveModal(row.id);
            }}
          />
        </>
      ),
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row: { id: number }) => row.id % 2 === 0,
      style: {
        backgroundColor: 'lightslategray',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

  return (
    <div className="baseline-entry">
      <Modal title="Archive Production" icon="save" onDismiss={closeSaveModal} isOpen={isModalSaveOpen}>
        <Button
          variant="primary"
          aria-label="Baseline entry submit button"
          onClick={() => {
            archiveProduction(archivedId);
          }}
        >
          Save
        </Button>
        <Button
          variant="primary"
          style={{ float: 'right' }}
          aria-label="Baseline entry submit button"
          onClick={() => {
            closeSaveModal();
          }}
        >
          cancel
        </Button>
      </Modal>

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
        <div>
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight="500px"
            pagination
            responsive
            subHeaderWrap
            columns={columns}
            data={productionEntries}
            conditionalRowStyles={conditionalRowStyles}
          />
        </div>
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
export default hot(module)(connector(ProductionEntryPage));
