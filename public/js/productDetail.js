window.onload = () => {
    const labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Under starting price",
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                data: [0, 10, 5, 2, null, null, null],
                fill: {
                    target: "start",
                    below: "rgb(255, 99, 132)",
                },
            },
            {
                label: "Above starting price",
                borderColor: "rgb(80, 255, 132)",
                backgroundColor: "rgba(80, 255, 132, 0.5)",
                data: [null, null, null, 30, 50, 92, 45],
                fill: {
                    target: "start",
                    below: "rgb(0,255,0) ",
                },
            },
        ],
    };

    const config = {
        type: "line",
        data: data,
        options: {},
    };

    const myChart = new Chart(document.getElementById("myChart"), config);
};
