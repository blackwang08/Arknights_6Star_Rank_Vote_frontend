type TableData = (string | number)[][];
type Labels = string[];

class TableComponent {

    private data: TableData;
    private labels: Labels;
    private container: HTMLDivElement;
    private headerRow: HTMLDivElement;
    private bodyRows: HTMLDivElement[];

    constructor(data: TableData, labels: Labels) {
        this.data = data;
        this.labels = labels;

        this.container = document.createElement('div');
        this.container.className = 'table-container';

        this.headerRow = this.createHeaderRow();
        this.bodyRows = this.createBodyRows();

        this.container.appendChild(this.headerRow);
        this.bodyRows.forEach(row => this.container.appendChild(row));
    }

    createHeaderRow() {
        const headerRow = document.createElement('div');
        headerRow.className = 'table-header table-row';

        // Add an empty cell for the row label column
        const emptyCell = document.createElement('div');
        emptyCell.className = 'table-cell row-label';
        headerRow.appendChild(emptyCell);

        this.labels.forEach(label => {
            const cell = document.createElement('div');
            cell.className = 'table-cell';
            cell.textContent = label;

            headerRow.appendChild(cell);
        });

        return headerRow;
    }

    createBodyRows() {
        return this.data.map((rowData, rowIndex) => {
            const row = document.createElement('div');
            row.className = 'table-row';
            row.onclick = () => this.selectRow(row);

            // Add row label cell
            const rowLabelCell = document.createElement('div');
            rowLabelCell.className = 'table-cell row-label';
            rowLabelCell.textContent = this.labels[rowIndex];
            row.appendChild(rowLabelCell);

            rowData.forEach(value => {
                const cell = document.createElement('div');
                cell.className = 'table-cell';
                cell.textContent = value.toString();

                row.appendChild(cell);
            });

            return row;
        });
    }

    selectRow(row: HTMLDivElement) {
        const selectedRows = this.container.querySelectorAll('.selected');
        selectedRows.forEach(selectedRow => selectedRow.classList.remove('selected'));

        row.classList.add('selected');
    }

    updateData(newData: TableData, newLabels: Labels) {
        this.data = newData;
        this.labels = newLabels;

        // Clear existing content
        this.container.innerHTML = '';

        // Recreate header and body rows
        this.headerRow = this.createHeaderRow();
        this.bodyRows = this.createBodyRows();

        // Append new header and body rows to the container
        this.container.appendChild(this.headerRow);
        this.bodyRows.forEach(row => this.container.appendChild(row));
    }

    mount(element: any) {
        element.appendChild(this.container);
    }
}

// Export the TableComponent class for use in other files
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = TableComponent;
} else {
    (window as any).TableComponent = TableComponent;
}

export default TableComponent;;

