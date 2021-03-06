# Generated by Django 3.1.2 on 2020-10-04 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('rating', models.SmallIntegerField(choices=[(0, '0'), (1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')], default=0, null=True)),
                ('category', models.CharField(choices=[('mis', 'Miscellaneous'), ('books', 'Books'), ('diy', 'DIY'), ('digital', 'Digital'), ('beauty', 'Beauty'), ('games', 'Video Games'), ('software', 'Software'), ('pc-tech', 'Computers & Tech'), ('tvs', 'TVs'), ('gym', 'Gym')], max_length=13, null=True)),
                ('description', models.TextField(null=True)),
                ('short_desc', models.TextField(null=True)),
                ('featured', models.BooleanField(default=False)),
                ('top_sell', models.BooleanField(default=False)),
                ('in_stock', models.BooleanField(default=True)),
                ('inventory_count', models.IntegerField(blank=True, null=True)),
                ('image', models.CharField(max_length=250, null=True)),
            ],
        ),
    ]
