import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog,} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot, query } from '@angular/fire/firestore';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalSales = 0;
  totalOffers = 0;
  totalProducts = 0;
  totalCustomers = 0;
  totalSoldAmount = 0;
  totalOffersAmount = 0;
  productSalesData: number[] = [];
  productLabels: string[] = [];
  productData: any[] = [];
  lastThreeSoldProducts: any[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router, private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.loadOrdersData();
    this.loadProductsData();
    this.loadCustomersData();
  }

  loadOrdersData() {
    this.firestoreService.getOrders().subscribe((orders) => {
      const option1Orders = orders.filter((order) => order.status === 'option1');
      const option2Orders = orders.filter((order) => order.status === 'option2');
  
      this.totalOffers = option1Orders.length;
      this.totalSales = option2Orders.length;
  
      this.totalSoldAmount = option2Orders.reduce((total, order) => {
        return total + parseFloat(order.total.replace(',', '.'));
      }, 0);
  
      this.totalOffersAmount = option1Orders.reduce((total, order) => {
        return total + parseFloat(order.total.replace(',', '.'));
      }, 0);

      const observables = option2Orders.slice(0, 3).map((order) =>
      this.firestoreService.getProduct(order.product)
    );

    
    forkJoin(observables).subscribe((products) => {
      this.lastThreeSoldProducts = products.map((product, index) => ({
        id: option2Orders[index].product,
        name: product.productName,
        pieces: option2Orders[index].pieces,
        total: option2Orders[index].total,
      }));
    });
  
      this.productSalesData = this.calculateProductSales(option2Orders);
      this.updateBarCharts();
      const soldData = [this.totalSoldAmount];
      const offerData = [this.totalOffersAmount];
  
      if (typeof document !== 'undefined') {
        // Warte auf den Abschluss der asynchronen Operationen, bevor die Pie-Chart erstellt wird
        this.loadProductData(Array.from(this.productLabels)).subscribe(() => {
          this.createBarChart(soldData, offerData, this.totalSoldAmount);
          this.createPieChart();
        });
      }
    });
  }

  calculateProductSales(option2Orders: any[]): number[] {
    const productSalesMap = new Map<string, number>();
    const productLabelsSet = new Set<string>();

    option2Orders.forEach((order) => {
      const productId = order.product;

      if (productSalesMap.has(productId)) {
        productSalesMap.set(productId, productSalesMap.get(productId)! + parseInt(order.pieces));
      } else {
        productSalesMap.set(productId, parseInt(order.pieces));
      }

      // Sammle eindeutige Produktlabels
      productLabelsSet.add(productId);
    });

    // Konvertiere Map-Daten in ein Array für die Pie-Chart
    this.productLabels = Array.from(productLabelsSet);

    // Lade Produktinformationen basierend auf den Produkt-IDs
    this.loadProductData(Array.from(productLabelsSet));

    const productSalesData = Array.from(productSalesMap.values());
    return productSalesData;
  }

  loadProductData(productIds: string[]): Observable<void> {
    // Lade Produktinformationen basierend auf den Produkt-IDs
    this.productData = [];
  
    // Erstelle ein Array von Observables für jede Produkt-ID
    const observables = productIds.map((productId) => this.firestoreService.getProduct(productId));
  
    // Verwende forkJoin, um auf den Abschluss aller Observables zu warten
    return forkJoin(observables).pipe(
      map((products: any[]) => {
        // products ist ein Array von Produktinformationen
        this.productData = products.map((product: any, index: number) => ({ id: productIds[index], ...product }));
      })
    );
  }

  loadProductsData() {
    this.firestoreService.getProducts().subscribe((products) => {
      this.totalProducts = products.length;
    });
  }

  loadCustomersData() {
    this.firestoreService.getCustomers().subscribe((customers) => {
      this.totalCustomers = customers.length;
    });
  }

  updateBarCharts(): void {
    const soldData = [this.totalSales];
    const offerData = [this.totalOffers];
  
    if (typeof document !== 'undefined') {
      this.createBarChart(soldData, offerData, this.totalSoldAmount);
    }
  }

  createBarChart(soldData: number[], offerData: number[], totalSoldAmount: number): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    Chart.getChart(ctx)?.destroy();
    const barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          {
            label: 'Sold',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            data: soldData
          },
          {
            label: 'Offers',
            backgroundColor: 'rgba(255,99,132,0.4)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            data: offerData
          }
        ]
      },
      options: {
        indexAxis: 'x', 
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }


  createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.productData.map(product => product.productName),
        datasets: [
          {
            label: 'Sales Quantity',
            backgroundColor: this.generateRandomColors(this.productData.length),
            borderColor: this.generateRandomColors(this.productData.length),
            borderWidth: 1,
            data: this.productSalesData
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Verberge die Standardlegende
          }},
          hover: {
            mode: 'index',
            intersect: true,
          },
        }
    });
  }

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
      colors.push(randomColor);
    }
    return colors;
  }
}
