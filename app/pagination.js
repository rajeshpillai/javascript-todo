var el = document.getElementById("pagination");

var pagination = {
    currentPage: 0,
    pageLength: 10,
    totalRecords: 50,
    render: function () {
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
        todoApp.render(pagedData);
    }
}

pagination.render();