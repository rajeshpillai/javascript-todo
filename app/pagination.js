var el = document.getElementById("pagination");

var pagination = {
    currentPage: 0,
    pageLength: 10,
    totalRecords: 50,
    render: function () {
        this.totalRecords = todoService.getTodosCount();
        console.log(`Paging ${this.totalRecords}`);
        let pages = this.totalRecords / this.pageLength;
        let buttons = '';
        for(let i = 1; i <= pages; i++) {
            buttons += this.getButton(i);
        }
        el.innerHTML = buttons;
    },
    getButton: function (text) {
        let html = `
            <button type="button" onclick="pagination.gotoPage(${text})">${text}</button>
        `;
        return html;
    },
    gotoPage: function (pageNo) {
        let pagedData = todoService.getPagedData(pageNo, this.pageLength);
        console.log("page: ", pagedData);
        todoApp.render(pagedData);
    }
}

pagination.render();